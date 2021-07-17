import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const emailService = {
    query,
    remove,
    getEmptyEmail,
    getById,
    addEmail,
    update
}


const EMAILS_KEY = 'emails';
const emailsDB = _createEmails();


function query() {
    return storageService.query(EMAILS_KEY)
}
function update(updatedEmail) {
    return storageService.put(EMAILS_KEY, updatedEmail)
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}
function getById(id) {
    return storageService.get(EMAILS_KEY, id)
}

function addEmail(emailToAdd) {
    return storageService.post(EMAILS_KEY, emailToAdd)
}

function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: 1551133930594,
        from: 'appsus@ca.com',
        to: '',
        isStarred: false,
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)
    if (!emails || !emails.length) {
        const emails = [
            {
                id: utilService.makeId(),
                subject: `Tip 3: Move faster with collaboration`,
                body:
                    `Shared workspaces can help your entire team
                    stay on top of their projects.
                    How to collaborate in Workona
                    Open a workspace and click the “Share” button
                    in the top-right. This is where youll invite
                    collaborators and manage sharing permissions
                    for the workspace.
                    Remember, your tabs are private and will never be shared.`,
                isRead: false,
                sentAt: 1151139930694,
                from: 'welcome@workona.com',
                to: 'appsus@ca.com',
                isStarred: false
            },
            {
                id: utilService.makeId(),
                subject: 'Appsus, please add me to your LinkedIn network',
                body: `© 2021 LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2.
                        LinkedIn is a registered business name of LinkedIn Ireland Unlimited Company. LinkedIn
                        and the LinkedIn logo are registered trademarks of LinkedIn.`,
                isRead: false,
                sentAt: 1451133635584,
                from: 'invitations@linkedin.com',
                to: 'appsus@ca.com',
                isStarred: false
            },
            {
                id: utilService.makeId(),
                subject: 'Your free trial is over',
                body: `Your Avocode free trial is over
                        The free trial for Appsus team has ended.
                        Please log in and purchase a subscription within 14 days to keep working on your design projects.`,
                isRead: false,
                sentAt: 1651139330594,
                from: 'hello@avocode.com',
                to: 'appsus@ca.com',
                isStarred: false
            },
            {
                id: utilService.makeId(),
                subject: 'Try Amazon Music Unlimited',
                body: `We hope you found this message to be useful. However, if you'd rather not receive future e-mails of this sort from Amazon.com, please opt-out here.
                © 2021 Amazon.com, Inc. or its affiliates. All rights reserved. Amazon, Amazon Echo, Amazon Music, Prime,
                and all related logos are trademarks of Amazon.com, Inc. or its affiliates.Amazon.com, 410 Terry Avenue N., Seattle, WA 98109-5210. Reference: 568322510`,
                isRead: false,
                sentAt: 17551133930594,
                from: 'store-news@amazon.com',
                to: 'appsus@ca.com',
                isStarred: false
            },
            {
                id: utilService.makeId(),
                subject: 'Google Key exposed on GitHub',
                body: `GitGuardian has detected the following Google Key exposed within your GitHub account.
                Details
                - Secret type: Google Key
                - Repository: LotanM/Travel-Tip
                - Pushed date: February 17th 2021, 20:40:36 UTC`,
                isRead: false,
                sentAt: 1551193930594,
                from: 'appsus@ca.com',
                to: 'welcome@workona.com',
                isStarred: false
            }
        ]
        utilService.saveToStorage(EMAILS_KEY, emails)
    }
    return emails;
}