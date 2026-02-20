const mapBlocks = [Object.values(map.blocks), Object.keys(map.blocks)];

const container = document.querySelector("#select-blocks");
const fragment = document.createDocumentFragment();

const blocksInDocument = document.querySelector("#blocks");

for (let i = 0; i < mapBlocks[0].length; i++) {
    let isContinue = false;
    for (let f = 0; f < map.blocksCategory.cannotUse.length; f++) {
        if (map.blocksCategory.cannotUse[f] == mapBlocks[1][i]) {
            isContinue = true;
            break;
        }
    }
    if (isContinue) continue;

    const img = mapBlocks[0][i];
    img.className = "select-blocks__img";

    const div = document.createElement("div");
    div.className = "select-blocks__obj";

    div.appendChild(img);
    div.onclick = () => {
        backpack.block = i;
        blocksInDocument.classList.replace("notHidden", "hidden");
    };

    fragment.appendChild(div);
}

container.appendChild(fragment);

const showSelectBlockMenu = () => {
    blocksInDocument.classList.replace("hidden", "notHidden");
    console.log(1);
};
