module.exports = {
    name: 'testAddon',
    author: "Sir Blob",
    version: '1.0',
    exe(api) {
        
        api.event.on('tgs-grassUpdate', () => {
            api.printsome();
        })
    }
}