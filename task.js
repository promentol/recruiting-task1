const input = require('./input.json')
const answer = require('./answer.json')

//hash table
const groups = {};

for (let i in input) {
    const element = input[i]
    element.children = [];
    groups[element.tier] = groups[element.tier] || [];
    groups[element.tier].push(element)
}

//sort each element inside group
for (let key in groups) {
    groups[key].sort((a, b) => a.start > b.start)
}

//sort keys by length
const keys = Object.keys(groups).sort((a, b) => a.length - b.length)

for (let j in keys) {
    const key = keys[j];
    console.log(key)
    const components = key.split('-');

    //push as a children each one by one
    for (let i = 0; i <= groups[key].length-2; ++i) {
        groups[key][i].children.push(groups[key][i+1])
    }
    
    //find closest parent
    while (components.length > 2) {
        const lastElement = components.pop();
        const parent = components.join('-');
        if(groups[parent]) {
            groups[parent][0].children.push(groups[key][0]);
            break;
        }
    }
}

function sortChildren(element) { 
    element.children.sort((a, b) => a.start - b.start)
    element.children.forEach(elem => {
        sortChildren(elem)
    });
}


const lowestKey = keys[0];
sortChildren(groups[lowestKey][0])

console.log(JSON.stringify([groups[lowestKey][0]]))

console.log(JSON.stringify([groups[lowestKey][0]]) == JSON.stringify(answer))