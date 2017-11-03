function loadLeagueTeams() {
    loadXMLTitle();
    loadXMLTitleDate();
    loadXMLData('men');
    loadXMLData('ladies');
}

function loadXMLTitle() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var xmlDoc = this.responseXML;
            document.getElementById("title").innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        }
    };
    xmlhttp.open("GET", "league_teams.xml", true);
    xmlhttp.send();
}

function loadXMLTitleDate() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var xmlDoc = this.responseXML;
            document.getElementById("title_date").innerHTML = xmlDoc.getElementsByTagName("date")[0].childNodes[0].nodeValue;
        }
    };
    xmlhttp.open("GET", "league_teams.xml", true);
    xmlhttp.send();
}

function loadXMLData(type) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            myFunction(this, type);
        }
    };
    xmlhttp.open("GET", "league_teams.xml", true);
    xmlhttp.send();
}

function myFunction(xml, type) {
    var i;
    var xmlDoc = xml.responseXML;

    var men = xmlDoc.getElementsByTagName(type);
    var teams = men[0].getElementsByTagName("team");
    var html = "";

    for (i = 0; i < teams.length; i++) {
        var team_no = i + 1;

        var fours = teams[i].getElementsByTagName("fours");
        var trips = teams[i].getElementsByTagName("trips");

        var division_type = teams[i].getElementsByTagName("division_type")[0].childNodes[0].nodeValue;
        var division = teams[i].getElementsByTagName("division_no")[0].childNodes[0].nodeValue;

        var fours_skip = fours[0].getElementsByTagName("skip")[0].childNodes[0].nodeValue;
        var fours_third = fours[0].getElementsByTagName("third")[0].childNodes[0].nodeValue;
        var fours_second = fours[0].getElementsByTagName("second")[0].childNodes[0].nodeValue;
        var fours_lead = fours[0].getElementsByTagName("lead")[0].childNodes[0].nodeValue;

        var trips_skip = "";
        var trips_second = "";
        var trips_lead = "";
        if (trips.length > 0) {
            trips_skip = trips[0].getElementsByTagName("skip")[0].childNodes[0].nodeValue;
            trips_second = trips[0].getElementsByTagName("second")[0].childNodes[0].nodeValue;
            trips_lead = trips[0].getElementsByTagName("lead")[0].childNodes[0].nodeValue;
        }

        var venue = teams[i].getElementsByTagName("venue")[0].childNodes[0].nodeValue;
        var opponent = teams[i].getElementsByTagName("opponent")[0].childNodes[0].nodeValue;
        var depart = teams[i].getElementsByTagName("depart")[0].childNodes[0].nodeValue;
        var captain = teams[i].getElementsByTagName("captain")[0].childNodes[0].nodeValue;

        html += "<div class=\"container scroll\">" +
            "<table id=\"league_html\" class=\"table isSearch\" cellspacing=\"0\">" +
            "<thead>" +
            "<tr class=\"table-heads \">" +
            "<th class=\"head-item mbr-fonts-style display-7\">" + division_type + " - " + "Division " + division + "</th>" +
            "<th class=\"head-item mbr-fonts-style display-7\">" + "Krugersdorp " + team_no + "</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + fours_skip + "</td>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + trips_skip + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + fours_third + "</td>" +
            "<td class=\"body-item mbr-fonts-style display-7\"></td>" +
            "</tr>" +
            "<tr>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + fours_second + "</td>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + trips_second + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + fours_lead + "</td>" +
            "<td class=\"body-item mbr-fonts-style display-7\">" + trips_lead + "</td>" +
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

    document.getElementById(type + "_league_html").innerHTML = html;
}