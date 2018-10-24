var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("./gold_medals.sqlite");

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
    const query = `create table Country (
        name text not null,
        code text not null,
        gdp integer, 
        population integer);`;
    return query;
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
    const query = `create table GoldMedal (
        id integer primary key,
        year integer not null,
        city text not null,
        season text not null,
        name text not null,
        country text not null,
        gender text not null,
        sport text not null,
        discipline text not null,
        event text not null
    );`;
    return query;
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
    const query = (`select count(*) from goldmedal where country = "${country}";`);
    return query;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {
    const query = (`select year, count(*) as Count
        from goldmedal
        where country = "${country}"
        and season = "Summer"
        group by year
        order by count desc
        limit 1;`);
    return query;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
    const query = (`select year, count(*)
        from goldmedal
        where country = "${country}"
        and season = "Winter"
        group by year
        limit 1;`);
    return query;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
    const query = (`select year, count(*) as Count
        from goldmedal
        where country = "${country}"
        group by year
        order by count desc
        limit 1;`);
    return query;
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
    const query = (`select discipline, count(*) as Count
        from goldmedal
        where country = "${country}"
        group by discipline
        order by count desc
        limit 1;`);
    return query;
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
    const query = (`select sport, count(*) as Count
        from goldmedal
        where country = "${country}"
        group by discipline
        order by count desc
        limit 1;`);
    return query;
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
    const query = (`select event, count(*) as Count
        from goldmedal
        where country = "${country}"
        group by discipline
        order by count desc
        limit 1;`);
    return query;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
    const query = (`select count(distinct name) as Count
        from goldmedal
        where gender = "Men"
        and country = "${country}"
        ;`);
    return query;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
    const query = (`select count(distinct name) as Count
        from goldmedal
        where gender = "Women"
        and country = "${country}"
        ;`);
    return query;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
    const query = (`select name, count(*) as Count
        from goldmedal
        where country = "${country}"
        group by name
        order by count desc
        limit 1;`);
    return query;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
    const query = (`select name
    from goldmedal
    where country = "${country}"
    ${field ? `order by ${field} ${sortAscending ? "asc" : "desc"}` : ""}
    ;`);
    return query;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
    return;
};

module.exports = {
    createCountryTable,
    createGoldMedalTable,
    goldMedalNumber,
    mostSummerWins,
    mostWinterWins,
    bestDiscipline,
    bestSport,
    bestYear,
    bestEvent,
    numberMenMedalists,
    numberWomenMedalists,
    mostMedaledAthlete,
    orderedMedals,
    orderedSports
};
