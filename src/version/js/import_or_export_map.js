const menu = {
    width: 700,
    height: 540,

    isShow: false,

    set() {
        const $obj = document.querySelector("#backdrop");

        if (blocksInDocument.classList[1] == "not_hidden") blocksInDocument.classList.replace("not_hidden", "hidden");
        else if (this.isShow) {
            $obj.classList.replace("not_hidden", "hidden");
            this.isShow = false;
        } else {
            $obj.classList.replace("hidden", "not_hidden");
            this.isShow = true;
        }
    },

    export(onlyGet = false, zip = false) {
        const export_map = {
            map: [],
            player: [player.x, player.y],
        };

        if (zip) {
            const id = {};
            for (let i = 0; i < Object.keys(map.blocks).length; i++) {
                id[Object.keys(map.blocks)[i]] = i;
            }

            for (let x = 0; x <= map.width; x++) {
                export_map.map.push([]);
                for (let y = 0; y <= map.height; y++) {
                    export_map.map[x].push(id[map.map[x][y]]);
                }
            }
        } else {
            for (let x = 0; x <= map.width; x++) {
                export_map.map.push([]);
                for (let y = 0; y <= map.height; y++) {
                    export_map.map[x].push(map.map[x][y]);
                }
            }
        }

        const dataStr = JSON.stringify(export_map);

        if (onlyGet) {
            return dataStr;
        }

        const blob = new Blob([dataStr], { type: "application/json" });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "RHcraft map.json";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    import() {
        const fileInput = document.querySelector("#file");

        if (!fileInput.files[0]) {
            alert("Будь ласка, спочатку виберіть файл!");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target.result;
                const importedData = JSON.parse(content);

                this.applyMap(importedData);
                console.log("Map import:", importedData);
            } catch (err) {
                console.error("error:", err);
                alert("Plaese select another file.");
            }
        };

        reader.readAsText(file);
    },

    applyMap(data) {
        const blocks = Object.keys(map.blocks);

        console.log(data);

        for (let x = 0; x <= map.width; x++) {
            for (let y = 0; y <= map.height; y++) {
                map.map[x][y] = data.map[x][y];
            }
        }

        player.x = data.player[0];
        player.y = data.player[1];
    },

    resize() {
        this.obj.style.width = this.width + "px";
        this.obj.style.height = this.height + "px";
    },
};
