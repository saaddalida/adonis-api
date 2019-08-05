'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskEmail = async (taskInstace) => {
  if (!taskInstace.user_id && !taskInstace.dirty.user_id) {
    return
  }

  const { email, username } = await taskInstace.user().fetch()
  const file = await taskInstace.file().fetch()

  const title = taskInstace

  await Mail.send(
    ['emails.new_task'],
    { username, title, hasAttachment: !!file },
    message => {
      message
        .to(email)
        .from('dalida@rocket.com', 'Dalida | Rocket')
        .subject('Você tem uma nova tarefa')

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}
