export default {
    name: 'note-todo',
    props: ["info"],
    template: `
        <section>
            <label>
                <input type="text" v-model="val" @change="reportVal" :list="listId" placeholder="Enter comma seperated list..."/>
            </label>
        </section>
        `,
    data() {
        return {
            val: "",
            vals: [],
            todoList: []
        }
    },
    methods: {
        customizedTodos() {
            this.vals = this.val.split(',');
            (this.vals).forEach(val => {
                let obj = {
                    txt: val,
                    doneAt: null,
                    isChecked: false
                }
                this.todoList.push(obj)
            })
            return this.todoList
        },
        reportVal() {
            this.$emit("setVal", this.customizedTodos());
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        }
    }
};
