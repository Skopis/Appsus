
export default {
    name: "note-img",
    template: `
        <section>
            <input type="text" v-model="val" @change="reportVal" :list="listId" placeholder="Enter image URL..." />  
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
