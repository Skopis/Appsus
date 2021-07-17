import { eventBus } from '../../../services/event-bus.service.js';
import { emailService } from '../services/email.service.js'


// SMART COMPONENT!

export default {
    name: 'email-details',
    template: `
    <section class="email-details" v-if="email">
        <button @click="removeEmail(email.id)">Delete</button>
        <h4 class="subject">{{email.subject}}</h4>
        <div class="address-details">
            <p>From: {{email.from}}</p>
            <p>To: {{email.to}}</p>
        </div>
        <p class="body">{{email.body}}</p>
        <p class="details-timestamp">Sent at {{formattedTime}}</p>
        <div class="details-button-container">
            <router-link to="/email">🠔 Back to inbox</router-link>
            <router-link :to="'/note/' + email.subject">Send to Notes</router-link>
            <router-link :to="'/email/compose/'+email.id">Reply 🠖</router-link>
        </div>
    </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        removeEmail(emailId) {
            this.$emit('remove', emailId);
        },
        sendEmailToNotes() {
            console.log('click')
            eventBus.$emit('email-to-note', this.email)
            this.$router.push('/note')
        }
    },
    computed: {
        formattedTime() {
            return new Date(this.email.sentAt)
        }
    },
    created() {
        const id = this.$route.params.emailId
        emailService.getById(id)
            .then(email => this.email = email)
    }
}