console.log("[+] Script chargé");

setImmediate(function () {
    try {
        var modules = Process.enumerateModules();
        var libc = null;

        for (var i = 0; i < modules.length; i++) {
            if (modules[i].name.indexOf("libc") !== -1) {
                libc = modules[i];
                break;
            }
        }

        if (libc === null) {
            console.log("[-] libc non trouvée");
            return;
        }

        var addr = libc.findExportByName("recv");

        if (addr) {
            console.log("[+] recv trouvée à :", addr);

            Interceptor.attach(addr, {
                onEnter: function (args) {
                    console.log("[+] recv appelée");
                }
            });
        } else {
            console.log("[-] recv non trouvée");
        }

    } catch (e) {
        console.log("Erreur :", e);
    }
});