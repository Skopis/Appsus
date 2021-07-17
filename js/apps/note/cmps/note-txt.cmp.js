export default {
    name:"note-txt",
    template: `
        <section>
            <input type="text" v-model="val" @change="reportVal" :list="listId" placeholder="type in some text" />  
        </section>
        `,
    props: ["info"],
    data() {
        return {
            val: ""
        };
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        }
    }
};
