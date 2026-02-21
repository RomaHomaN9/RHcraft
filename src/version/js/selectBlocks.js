const mapBlocks = [Object.values(map.blocks), Object.keys(map.blocks)];

const container = document.querySelector("#select-blocks");
const fragment = document.createDocumentFragment();

const blocksInDocument = document.querySelector("#blocks");

for (let i = 0; i < mapBlocks[0].length; i++) {
    if (map.blocksCategory.isReturn(false, "cannotUse", mapBlocks[1][i])) continue;

    const img = mapBlocks[0][i];
    img.className = "select-blocks__img";

    const div = document.createElement("div");
    div.className = "select-blocks__obj";

    div.appendChild(img);
    div.onclick = () => {
        backpack.block = i;
    };

    fragment.appendChild(div);
}

container.appendChild(fragment);

const showSelectBlockMenu = () => {
<<<<<<< HEAD
    if (blocksInDocument.classList[1] == "hidden") blocksInDocument.classList.replace("hidden", "not_hidden");
    else blocksInDocument.classList.replace("not_hidden", "hidden");
=======
    if (blocksInDocument.classList[1] == "hidden") blocksInDocument.classList.replace("hidden", "notHidden");
    else blocksInDocument.classList.replace("notHidden", "hidden");
>>>>>>> dev
    console.log(1);
};
