module.exports = personMapper;


function personMapper(input) {

    const map = {};
    input.forEach(entry => {
        const {
            personId,
            name,
            surName,
            ...lend
        } = entry;
        if (map[entry.personId]) {
            map[entry.personId].lend.push(lend);
        } else {
            map[entry.personId] = {
                personId,
                name,
                surName,
                lend: [lend]
            };
        }
    });

    return Object.values(map);
}