let app = new Vue({
    el: '#app',
    data: {
        time: new Date().toLocaleString(),
        todayTimetable: window.timetable[new Date().getDay()],
        showDeletedNotification: false,
        undo: false,
        currentSubject: { id: -1 },
        currentId: -1,
        isShowCurrentSubjectOnly: window.applicationSetting.showCurrentSubjectOnly,
        messagePopup: false,
        isSettingPopupOpen: false,
        newSubject: {},
        isAdd: false
    },
    mounted() {
        this.currentSubject = this.getCurrentSubject()
        
        Vue.nextTick(function () {
            setInterval(function () {
                this.time = new Date().toLocaleString()
            }.bind(this), 1000)

            setInterval(function (){
                this.currentSubject = this.getCurrentSubject()
                this.currentId = parseInt(this.currentSubject?.id || -1)
            }.bind(this), 1000)
        }.bind(this))

        
    },
    methods: {
        toggleAdd() {
            this.isAdd = !this.isAdd

            if(!this.isAdd) return

            const lastSubject = this.getLastSubjectInDay(new Date().getDay())

            if(!lastSubject) return

            const lastSubjectStartTime = new Date()
            lastSubjectStartTime.setHours(lastSubject.start_time.split(':')[0])
            lastSubjectStartTime.setMinutes(lastSubject.start_time.split(':')[1])

            const lastSubjectEndTime = new Date()
            lastSubjectEndTime.setHours(lastSubject.end_time.split(':')[0])
            lastSubjectEndTime.setMinutes(lastSubject.end_time.split(':')[1])

            const lastSubjectTime = lastSubjectEndTime - lastSubjectStartTime
            

            this.newSubject.start_time = lastSubject.end_time

            const estimateEndTime = new Date(lastSubjectEndTime.getTime() + lastSubjectTime)
            this.newSubject.end_time = estimateEndTime.getHours().toString().padStart(2, '0') + ':' + estimateEndTime.getMinutes().toString().padStart(2, '0')

        },
        toggleSettingPopup() {
            this.isSettingPopupOpen = !this.isSettingPopupOpen
        },
        openSpotify() {
            this.showPopup('Opening Spotify')
            window.open(window.applicationSetting.spotifyRelaxationLink, '_blank')
        },
        openYoutube() {
            this.showPopup('Opening Youtube')
            window.open(window.applicationSetting.youtubeRelaxationLink, '_blank')
        },
        showPopup(message){
            this.messagePopup = message

            setTimeout(function() {
                this.messagePopup = false
            }.bind(this), 4000)
        },
        toggleShowCurrentSubjectOnly(){
            window.applicationSetting.showCurrentSubjectOnly = this.isShowCurrentSubjectOnly
            window.writeApplicationSetting(window.applicationSetting)
        },
        getCurrentSubject(){
            return this.getFirstItemInArray(
                this.todayTimetable.map(e => {
                    const endTime = e.end_time.split(':')
                    const hour = parseInt(endTime[0])
                    const minute = parseInt(endTime[1])
                    const startDate = new Date()
                    startDate.setHours(hour)
                    startDate.setMinutes(minute)
                    startDate.setSeconds(0)
                    const currentSubject = Object.assign(e, { time: startDate - new Date(this.time)})

                    return currentSubject
                }).filter(e => e.time > 0).sort((a, b) => a.time - b.time)
            )
        },
        addElement(dateOfWeek = new Date().getDay()) {
            const lastElement = this.getLastSubjectInDay()
            this.newSubject.id = lastElement.id + 1
            window.timetable[dateOfWeek].push(this.newSubject)
            this.save()
            this.newSubject = {}
        },
        save(){
            window.writeTimetable(window.timetable)
        },
        deleteNotification(){
            this.showDeletedNotification = true

            setTimeout(function () {
                this.showDeletedNotification = false

                if(!this.undo) {
                    this.save()
                }

                this.undo = false
            }.bind(this), 5000)
        },
        setUndo(){
            this.undo = true
            loadData()
            this.todayTimetable = window.timetable[new Date().getDay()]
            this.showDeletedNotification = false
        },
        getFirstItemInArray: (arr) => arr[0] ?? null,
        delay(callback, delay){
            setTimeout(callback.bind(this), delay)
        },
        getLastSubjectInDay(dateOfWeek){
            const todayTimetable = window.timetable[dateOfWeek]
            const lastElement = this.todayTimetable[this.todayTimetable.length - 1]

            return Object.assign({}, lastElement) || null
        },
        showAppInformation(){
            alert("Version: Beta 12112021" +
            "\nMade by Phuc" +
            "\nAny error report please send to my email: phucnguyenvuong07@gmail.com")
        }
    }
})
