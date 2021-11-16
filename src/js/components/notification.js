Vue.component('notification', {
    template: `
    <div class="notification">
        {{ msg }}
        <slot></slot>
    </div>`,
    props: ['msg'],
})