Vue.component('subject-item', {
    template: `
    <div class="border-2 border-gray-100 flex p-5 gap-2 mb-3 relative">
        <div class="text-center pl-1 pr-4">
            <div class="mb-2">{{ subject_info.start_time }} - {{ subject_info.end_time }}</div>
            {{ subject_info.subject }}{{ subject_info.teacher ? ' - ' : '' }}{{ subject_info.teacher }}
        </div>
        <div class="flex-[2] h-[fit-content] my-auto relative pl-5">
            <div class="mb-2" v-if="subject_info.room_id"><b>ID: <span class="select-all">{{ subject_info.room_id }}</span></b></div>
            <div class="mb-2" v-if="subject_info.meet_link"><b><a :href="subject_info.meet_link" target="_blank">Link Google Meet</a></b></div>
            <div v-if="subject_info.pwd">Password: <span class="spoiler select-all">123456</span></div>
        </div>
        <div class="ml-auto flex gap-4 h-[fit-content] my-auto">
            <div class="edit-btn" @click="editElement()"><i class="bi bi-pencil-fill center-ico"></i></div>
            <div class="delete-btn" @click="deleteElement(subject_info.id)"><i class="bi bi-trash-fill center-ico"></i></div>
        </div>
        <div class="flex h-3 w-3 absolute top-0 right-0 translate-x-[50%] translate-y-[-50%]" v-if="isPing">
            <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
        </div>
        <edit-modal @editSave="editSave()" @closeModal="delay(editElement, 0.3 * 1000)" :subject_data="subject_info" v-if="isEdit"></edit-modal>
    </div>
    `,
    props: ['subject_info', 'currentsbj'],
    data: function () {
        return {
            isPing: false,
            isEdit: false,
        }
    },
    mounted(){
        Vue.nextTick(function () {
            setInterval(function () {
                this.isPing = this.currentsbj === this.subject_info.id
            }.bind(this), 1000)
        }.bind(this))
    },
    methods: {
        deleteElement(id, dateOfWeek = new Date().getDay()){
            const todayTimetable = window.timetable[dateOfWeek]
            const index = todayTimetable.findIndex(element => element.id === id)
            todayTimetable.splice(index, 1)
            this.$emit('delete')
        },
        editElement(){
            this.isEdit = !this.isEdit
        },
        delay(callback, delay){
            setTimeout(callback.bind(this), delay)
        },
        editSave(){
            this.isEdit = false
            this.$emit('edit-save')
        }
    }
})