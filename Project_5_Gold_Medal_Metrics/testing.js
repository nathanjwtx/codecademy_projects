const orderedSports = (country, field, sortAscending) => {
    const query = (`
        create temp table totalWins as
        select country, count(country) as Wins integer
        from GoldMedal
        group by country;
        select sport, count(sport) as Count, (count(sport) * 1.0 / totalWins.Wins * 1.0) * 100 as Percentage
        from GoldMedal
        inner join totalWins on GoldMedal.country = totalWins.country
        where GoldMedal.country = ${country}
        group by sport
        ;`);
    return query;
};

console.log(orderedSports("Greece"));