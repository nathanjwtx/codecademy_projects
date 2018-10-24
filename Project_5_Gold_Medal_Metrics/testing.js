const goldMedalNumber = country => {
    const query = (`select count(*) from goldmedal where country = "${country}";`)
    return query;
};

console.log(goldMedalNumber("Greece"));