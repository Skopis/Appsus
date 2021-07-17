import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <section v-if="msg" class="user-msg" :class="msg.type">
            <!-- <button @click="msg=null">X</button> -->
            <p>{{msg.txt}}</p>
        </section>
    `,
    data() {
        return {
            msg: null
        }
    },
    methods: {
        setMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 2000);
        }
    },
    created() {
        eventBus.$on('show-msg', this.setMsg)
    },
    destroyed(){
        eventBus.$off('show-msg', this.setMsg)
    }
}