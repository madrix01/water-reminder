const { app, BrowserWindow, Tray, Menu, Notification } = require('electron')


let tray;
let notificationInterval;
let notifTimeInterval;

const isFirstInstance = app.requestSingleInstanceLock();
if (!isFirstInstance) {
    app.quit();
}

function createWindow () {
    const win = new BrowserWindow({
    width: 420,
    height: 500,
    webPreferences: {
        nodeIntegration: true
    }
    })
    win.setResizable(false);
    win.loadFile('index.html')
}


app.whenReady().then(() => {
    initTrayMenu();
    startUpNotif();
})

app.on('quit', () => {
    clearInterval()
})

const initTrayMenu = () => {
    tray = new Tray('./Assets/icon32.png')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click: () => app.quit()
        },
        {
            label: 'Start',
            click: () => {
                createWindow();
                document.querySelector('#start').addEventListener('click', () => {
                    console.log("Hello");
                })
            }
        }
    ])
    tray.setContextMenu(contextMenu);
}

const sendNotification = () => {
    if(!Notification.isSupported) return;
    
    const notification = new Notification({
        title : "Drink you MF Water nigga",
        body : "Drink the water stop staring at the notification",
        sound: true,
        timeoutType: "never",
        icon: "./Assets/icon.png"
    })
    notification.show();
}

//App startup notification
const startUpNotif = () => {
    if(!Notification.isSupported) return;

    const notification = new Notification({
        title : "I m up nigga",
        body : "You betta start drinkin yo wata",
        sound: true,
        icon: "./Assets/icon.png"
    })
    notification.show();
}