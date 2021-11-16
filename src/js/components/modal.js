Vue.component('modal', {
    template: `
    <div class="form-modal">
        <div class="dark-frame"></div>
        <div @click.self="frameClick()" id="white-frame" class="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center">
            <div class="bg-white min-w-[50%] min-h-[30%] rounded-md py-5 px-4 form" :class="{ 'scale-out': onClosing }">
                <slot></slot>
            </div>
        </div>
    </div>
    `,
    data(){
        return {
            onClosing: false
        }
    },
    methods: {
        frameClick() {
            this.onClosing = true
            this.$emit('frameClick')
        }
    }
})