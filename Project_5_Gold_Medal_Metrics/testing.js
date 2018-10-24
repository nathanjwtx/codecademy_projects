const orderedMedals = (country, field, sortAscending) => {
    const query = (`select name
    from goldmedal
    where country = "${country}"
    ${field ? `order by ${field} ${sortAscending ? "asc" : "desc"}` : ""}
    ;`);
    return query;
};

console.log(orderedMedals("Greece"));