const names = [
    "Joe",
    "Joey",
    "Yugi",
    "Kaiba",
    "Goku",
    "Chichi",
    "Mimi",
    "Mini-me",
    "Ichigo",
    "Light",
];

export const getRandomName = (currentName: string) => {
    let nextName = currentName;

    while (nextName === currentName) {
        nextName = names[Math.floor(Math.random() * names.length)];
    }

    return nextName;
};
