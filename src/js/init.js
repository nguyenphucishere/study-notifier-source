const fs = require('fs')

window.applicationSetting = JSON.parse(fs.readFileSync('./settings/application.json', 'utf8'))
window.writeApplicationSetting = (applicationSetting) => {
    fs.writeFileSync('./settings/application.json', JSON.stringify(applicationSetting))
}

const loadData = () => {
    const data = fs.readFileSync('./settings/timetable.json', 'utf8')
    window.timetable = JSON.parse(data)
}
loadData()

window.getSubjectById = (id, dateOfWeek = new Date().getDay()) => {
  return window.timetable[dateOfWeek].find(subject => subject.id === id)
}
window.writeTimetable = (timetable) => {
  fs.writeFileSync('./settings/timetable.json', JSON.stringify(timetable))
}

console.log(window.timetable)