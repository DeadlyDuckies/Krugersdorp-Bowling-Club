function loadCompetitions() {
    loadLastUpdated();
    loadXMLData();
}

function loadLastUpdated() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var xmlDoc = this.responseXML;
            var lastUpdated = xmlDoc.getElementsByTagName("lastUpdated")[0].childNodes[0].nodeValue;
            document.getElementById("lastUpdated").innerHTML = "<p>Last Updated: " + lastUpdated + "</p>";
        }
    };
    xmlHttp.open("GET", "../config/competitions.xml", true);
    xmlHttp.send();
}

function loadXMLData() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            populateCompetitions(this);
        }
    };
    xmlHttp.open("GET", "../config/competitions.xml", true);
    xmlHttp.send();
}

function populateCompetitions(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var html = "";

    var competitions = xmlDoc.getElementsByTagName("competition");

    for (i = 0; i < competitions.length; i++) {
        var competitionName = competitions[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;

        html += "<section class=\"mbr-section content4 cid-qztSxSN3he\" id=\"content4-20\" data-rv-view=\"130\">" +
            "<div class=\"container\">" +
            "<div class=\"media-container-row\">" +
            "<div class=\"title col-12 col-md-8\">" +
            "<h3 class=\"mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5\">" +
            competitionName +
            "</h3>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</section>";

        var knockoutDraw = populateKnockoutDraw(competitions[i]);

        html += "<section class=\"section-table cid-qztItQMCpK\" id=\"table1-1t\" data-rv-view=\"84\">" +
            "<div class=\"container container-table\">" +
            "<div class=\"table-wrapper\">" +
            "<div class=\"container\">" +
            knockoutDraw +
            "</div>" +
            "</div>" +
            "</div>" +
            "</section>"
    }

    console.log(html);

    document.getElementById("competition_data").innerHTML = html;
}

function populateKnockoutDraw(competition) {
    var i;
    var rounds = competition.getElementsByTagName("round");

    var html = "<div class=\"container scroll\">" +
        "<table class=\"table isSearch\" cellspacing=\"0\">" +
        "<thead>" +
        "<tr class=\"table-heads \">";

    for (i = 0; i < rounds.length; i++) {
        var completedBy = rounds[i].getElementsByTagName("completedBy")[0].childNodes[0].nodeValue;

        html += "<th class=\"head-item mbr-fonts-style display-7\">" + completedBy + "</th>";

        if (rounds.length > 1) {
            html += "<th class=\"head-item mbr-fonts-style display-7\"></th>";
        }
    }

    html += "</tr>" +
            "</thead>" +
            "</table>";




            // "<tbody>" +
            // "<tr>" +
            // "<td class=\"body-item mbr-fonts-style display-7\">" + foursSkip + "</td>" +
            // "<td class=\"body-item mbr-fonts-style display-7\">" + tripsSkip + "</td>" +
            // "</tr>" +
            // "<tr>" +
            // "<td class=\"body-item mbr-fonts-style display-7\">" + foursThird + "</td>" +
            // "<td class=\"body-item mbr-fonts-style display-7\"></td>" +
            // "</tr>" +
            // "<tr>" +
            // "<td class=\"body-item mbr-fonts-style display-7\">" + foursSecond + "</td>" +
            // "<td class=\"body-item mbr-fonts-style display-7\">" + tripsSecond + "</td>" +
            // "</tr>" +
            // "<tr>" +
            // "<td class=\"body-item mbr-fonts-style display-7\">" + foursLead + "</td>" +
            // "<td class=\"body-item mbr-fonts-style display-7\">" + tripsLead + "</td>" +
            // "</tr>" +
            // "</tbody>" +
            // "</table>" +
            // "<div class=\"container table-info-container\">" +
            // "<div class=\"row info\">" +
            // "<div class=\"col-md-6\">" +
            // "<div class=\"dataTables_info mbr-fonts-style display-7\">" +
            // "<div>Venue: " + venue + "</div>" +
            // "<div>Opponent: " + opponent + "</div>" +
            // "<div>Depart: " + depart + "</div>" +
            // "<div>Captain: " + captain + "</div>" +
            // "</div>" +
            // "</div>" +
            // "</div>" +
            // "</div>" +
            // "</div>";
    return html;
}

function populateLeagueTeams(xml, type) {
    var i;
    var xmlDoc = xml.responseXML;

    var menLadies = xmlDoc.getElementsByTagName(type);
    var teams = menLadies[0].getElementsByTagName("team");
    var html = "";

    for (i = 0; i < teams.length; i++) {
        if (teams[i].getElementsByTagName("division_type").length === 0) {
            continue;
        }

        var teamNo = i + 1;

        var fours = teams[i].getElementsByTagName("fours");
        var trips = teams[i].getElementsByTagName("trips");

        var divisionType = teams[i].getElementsByTagName("division_type")[0].childNodes[0].nodeValue;
        var division = teams[i].getElementsByTagName("division_no")[0].childNodes[0].nodeValue;

        var foursSkip = fours[0].getElementsByTagName("skip")[0].childNodes[0].nodeValue;
        var foursThird = fours[0].getElementsByTagName("third")[0].childNodes[0].nodeValue;
        var foursSecond = fours[0].getElementsByTagName("second")[0].childNodes[0].nodeValue;
        var foursLead = fours[0].getElementsByTagName("lead")[0].childNodes[0].nodeValue;

        var tripsSkip = "";
        var tripsSecond = "";
        var tripsLead = "";
        if (trips.length > 0) {
            tripsSkip = trips[0].getElementsByTagName("skip")[0].childNodes[0].nodeValue;
            tripsSecond = trips[0].getElementsByTagName("second")[0].childNodes[0].nodeValue;
            tripsLead = trips[0].getElementsByTagName("lead")[0].childNodes[0].nodeValue;
        }

        var venue = teams[i].getElementsByTagName("venue")[0].childNodes[0].nodeValue;
        var opponent = teams[i].getElementsByTagName("opponent")[0].childNodes[0].nodeValue;
        var depart = teams[i].getElementsByTagName("depart")[0].childNodes[0].nodeValue;
        var captain = teams[i].getElementsByTagName("captain")[0].childNodes[0].nodeValue;

        html += "<div class=\"container scroll\">" +
            "<table id=\"league_html\" class=\"table isSearch\" cellspacing=\"0\">" +
            "<thead>" +
            "<tr class=\"table-heads \">" +
            "<th class=\"head-item mbr-fonts-style display-7\">" + divisionType + " - " + "Division " + division + "</th>" +
            "<th class=\"head-item mbr-fonts-style display-7\">" + "Krugersdorp " + teamNo + "</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + foursSkip + "</td>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + tripsSkip + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + foursThird + "</td>" +
            "<td class=\"body-item mbr-fonts-style display-7\"></td>" +
            "</tr>" +
            "<tr>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + foursSecond + "</td>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + tripsSecond + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + foursLead + "</td>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + tripsLead + "</td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "<div class=\"container table-info-container\">" +
            "<div class=\"row info\">" +
            "<div class=\"col-md-6\">" +
            "<div class=\"dataTables_info mbr-fonts-style display-7\">" +
            "<div>Venue: " + venue + "</div>" +
            "<div>Opponent: " + opponent + "</div>" +
            "<div>Depart: " + depart + "</div>" +
            "<div>Captain: " + captain + "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
    }
    
    var reserves = "";
    if (menLadies[0].getElementsByTagName("reserves")[0].childNodes.length > 0) {
        reserves = menLadies[0].getElementsByTagName("reserves")[0].childNodes[0].nodeValue;
    }
    var unavailable = "";
    if (menLadies[0].getElementsByTagName("unavailable")[0].childNodes.length > 0) {
        unavailable = menLadies[0].getElementsByTagName("unavailable")[0].childNodes[0].nodeValue;
    }

    html += "<div class=\"container table-info-container\">" +
            "<div class=\"row info\">" +
            "<div class=\"col-md-6\">" +
            "<div class=\"dataTables_info mbr-fonts-style display-7\">" +
            "<p>Reserves: " + reserves + "<br> Unavailable: " + unavailable + "</p>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

    document.getElementById(type + "_league_html").innerHTML = html;
}

function loadXMLSelectionCommittee(type) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var xmlDoc = this.responseXML;
            var menLadies = xmlDoc.getElementsByTagName(type);
            document.getElementById(type + "_league_selection_committee").innerHTML = "<strong>" + convertToCamelCase(type) + "</strong><br>" + menLadies[0].getElementsByTagName("selectionCommittee")[0].childNodes[0].nodeValue;
        }
    };
    xmlHttp.open("GET", "../config/league_teams.xml", true);
    xmlHttp.send();
}

function convertToCamelCase(string) {
    return string.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
        return m.toUpperCase();
    });
};