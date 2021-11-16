Vue.component('add-modal', {
    template: `
        <modal @frameClick="closeModal()">
            <form id="subject_data.id">
                <div class="flex gap-2">
                    <div class="group w-[50%]">
                        <label class="block font-bold">Start time</label>
                        <input type="time" class="flex-1 w-full rounded-sm border border-1 p-1" v-model="start_time">
                    </div>

                    <div class="group w-[50%]">
                        <label class="block font-bold">End time</label>
                        <input type="time" class="flex-1 w-full rounded-sm border border-1 p-1" v-model="end_time">
                    </div>
                </div>
                <div class="flex mt-2">
                    <div class="group flex-1">
                        <label class="block font-bold">Subject</label>
                        <input type="text" class="flex-1 w-full rounded-sm border border-1 p-1" v-model="subject">
                    </div>
                </div>

                <div class="flex mt-2">
                    <div class="group flex-1">
                        <label class="block font-bold">Teacher</label>
                        <input type="text" class="flex-1 w-full rounded-sm border border-1 p-1" v-model="teacher">
                    </div>
                </div>

                <div class="flex mt-2">
                    <div class="group flex-1">
                        <label class="block font-bold">Room ID</label>
                        <input type="text" class="flex-1 w-full rounded-sm border border-1 p-1" v-model="roomId">
                    </div>
                </div>

                <div class="flex mt-2">
                    <div class="group flex-1">
                        <label class="block font-bold">Password</label>
                        <input type="password" class="flex-1 w-full rounded-sm border border-1 p-1" v-model="password">
                    </div>
                </div>

                <div class="flex mt-2">
                    <div class="group flex-1">
                        <label class="block font-bold">Google Meet link</label>
                        <input type="text" class="flex-1 w-full rounded-sm border border-1 p-1" v-model="meetLink">
                    </div>
                </div>

                <div class="flex mt-4">
                    <div class="group flex-1">
                        <button @click="save()" type="button" class="text-green-600 py-1 px-2 bg-white rounded-md transition-all border-green-600 border border-1 hover:text-white hover:bg-green-600">
                                <i class="bi bi-check2"></i> Done
                        </button>
                        <button @click="close()" type="button" class="text-gray-500 py-1 px-2 bg-white rounded-md transition-all border-gray-500 border border-1 hover:text-white hover:bg-gray-500">
                            <i class="bi bi-x-lg"></i> Cancel
                        </button>
                    </div>
                </div>
            </form>
        </modal>
    `,
    props: [ 'subject_data' ],
    data(){
        return {
            start_time: '00:00',
            end_time: '00:00',
            subject: '',
            teacher: '',
            password: '',
            roomId: '',
            meetLink: '',
        }
    },
    mounted(){
        this.start_time = this.subject_data.start_time || '00:00'
        this.end_time = this.subject_data.end_time || '00:00'
    },
    methods: {
        close(){
            (() => {
                document.getElementById('white-frame').click()
            })()
        },
        save(){
            this.subject_data.start_time = this.start_time
            this.subject_data.end_time = this.end_time
            this.subject_data.subject = this.subject
            this.subject_data.teacher = this.teacher
            this.subject_data.pwd = this.password
            this.subject_data.room_id = this.roomId
            this.subject_data.meet_link = this.meetLink

            this.close()
            this.$emit('add-save')
        },
        closeModal(){
            this.$emit('close-modal')
        }
    },
})