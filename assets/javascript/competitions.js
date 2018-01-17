function loadCompetitions() {
    loadLastUpdated();
    loadXMLData();
}

function loadCompetitionsForMaintenance() {
    loadXMLDataForMaintenance();
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

function loadXMLDataForMaintenance() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            populateCompetitionsForMaintenance(this);
        }
    };
    xmlHttp.open("GET", "../config/competitions.xml", true);
    xmlHttp.send();
}

function populateCompetitions(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var html = "";
    var competitionName;

    var competitions = xmlDoc.getElementsByTagName("competition");

    html += "<section class=\"mbr-section article content1 cid-qztwLS1X2N2\" id=\"content1-1r\" data-rv-view=\"17\">" +
        "<div class=\"container\">" +
        "<div class=\"media-container-row\">" +
        "<div class=\"mbr-text mbr-fonts-style display-7\">" +
        "<div>" +
        "<p><strong>Competitions currently in progress:</strong></p>" +
        "<ol>";

    for (i = 0; i < competitions.length; i++) {
        competitionName = competitions[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;

        html += "<li><a href='#PageSection-" + i + "'>" + competitionName + "</a></li>";
    }

    html += "</ol>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<hr>" +
            "</section>";

    for (i = 0; i < competitions.length; i++) {
        competitionName = competitions[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;

        html += "<section class=\"mbr-section content4 cid-qztSxSN3he\" id=\"content4-20\" data-rv-view=\"130\">" +
            "<span id='PageSection-" + i + "'></span>" +
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

        var knockoutDraw = populateKnockoutDrawHeader(competitions[i], i);

        html += "<section class=\"section-table competitionKnockout\" id=\"table1-1t\" data-rv-view=\"130\">" +
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

    for (i = 0; i < competitions.length; i++) {
        populateKnockoutDraw(competitions[i], i)
    }
}

function populateKnockoutDrawHeader(competition, competitionNumber) {
    var i;
    var rounds = competition.getElementsByTagName("round");

    var html = "<div class=\"container scroll\">" +
        "<table id='myTable" + competitionNumber + "' class=\"table isSearch\" cellspacing=\"0\">" +
        "<thead>" +
        "<tr class=\"table-heads \">";

    for (i = 0; i < rounds.length; i++) {
        var completedBy = rounds[i].getElementsByTagName("completedBy")[0].childNodes[0].nodeValue;

        html += "<th class=\"head-item mbr-fonts-style display-7\">" + completedBy + "</th>";
    }

    html += "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>" +
            "</table>" +
            "<br>" +
            "<br>";

    return html;
}

function populateKnockoutDraw(competition, competitionNumber) {
    var teams = competition.getElementsByTagName("team");
    var numberOfTeams = teams.length;

    var rounds = competition.getElementsByTagName("round");
    var numberOfRounds = rounds.length;

    var knockoutGenerator = numberOfTeams;

    if (numberOfRounds > 1) {
        if (numberOfTeams <= 2) {
            knockoutGenerator = 2;
        } else if (numberOfTeams <= 4) {
            knockoutGenerator = 4
        } else if (numberOfTeams <= 8) {
            knockoutGenerator = 8
        } else if (numberOfTeams <= 16) {
            knockoutGenerator = 16
        } else if (numberOfTeams <= 32) {
            knockoutGenerator = 32
        } else if (numberOfTeams <= 64) {
            knockoutGenerator = 64
        } else if (numberOfTeams <= 128) {
            knockoutGenerator = 128
        } else {
            knockoutGenerator = 256;
        }

        knockoutGenerator *=2;
        knockoutGenerator -=2;
    } else {
        knockoutGenerator += (rounds[0].getElementsByTagName("game").length - 1);
    }

    for (var i = 0; i < knockoutGenerator; i++) {
        addRow("", competitionNumber);
    }

    var startingRow = 0;
    var column = 0;
    for (var j = 0; j < numberOfRounds; j++) {
        var games = rounds[j].getElementsByTagName("game");
        var numberOfGames = games.length;
        var row = startingRow + 1;

        for (var k = 0; k < numberOfGames; k++) {
            var homeTeamNumber = games[k].getElementsByTagName("home")[0].childNodes[0].nodeValue;
            var homeTeam = lookupTeamName(competition, homeTeamNumber);
            var awayTeamNumber = games[k].getElementsByTagName("away")[0].childNodes[0].nodeValue;
            var awayTeam = lookupTeamName(competition, awayTeamNumber);
            var winningTeam = games[k].getElementsByTagName("winner")[0].childNodes[0].nodeValue;
            var className = "";

            if (winningTeam.trim().length === 0) {
                winningTeam = 99999;
            }

            if (homeTeamNumber === winningTeam) {
                className = "winner-body-text mbr-fonts-style display-7";
            }
            updateCell(competitionNumber, homeTeam, row, column, className);
            row++;

            if (awayTeamNumber === winningTeam) {
                className = "winner-body-text mbr-fonts-style display-7";
            } else {
                className = "";
            }
            updateCell(competitionNumber, awayTeam, row, column, className);
            row++;

            if (k < numberOfGames - 1) {
                if (numberOfRounds > 1) {
                    updateCell(competitionNumber, "", row, column, "right-border mbr-fonts-style display-7");
                }
                row++;
                if (numberOfRounds > 1) {
                    updateCell(competitionNumber, "", row, column, "right-border mbr-fonts-style display-7");
                    row++;
                }
            }

            if (numberOfRounds > 1 && (k + 1) < numberOfGames) {
                var tempRow = row;
                row += (startingRow * 2);
                for (var z = tempRow; z < row; z++) {
                    updateCell(competitionNumber, "", z, column, "right-border mbr-fonts-style display-7");
                }
            }
        }
        column++;
        if (numberOfGames > 0) {
            startingRow = (startingRow * 2) + 2;
        }
    }
}

function addRow(text, competitionNumber) {
    var tableName = "myTable" + competitionNumber;
    var table = document.getElementById(tableName);
    var insertRow = -1;
    if (!table.getElementsByTagName("tr")) {
        insertRow = 0;
    }
    table.insertRow(insertRow);
    var numberOfRows = table.rows.length-1;

    var numberOfCells = table.rows[0].cells.length;
    if (numberOfCells < 1) {
        numberOfCells = 1;
    }

    for (var cell = 0; cell < numberOfCells; cell++) {
        table.rows[numberOfRows].insertCell(cell);
        table.rows[numberOfRows].cells[cell].innerHTML  = text;
        table.rows[numberOfRows].cells[cell].className  = "body-item mbr-fonts-style display-7";
    }
}

function updateCell(competitionNumber, text, row, column, className) {
    var tableName = "myTable" + competitionNumber;
    var table = document.getElementById(tableName);
    var emptyText = false;

    if (text.trim().length === 0) {
        emptyText = true;
    }

    if (className.trim().length > 0) {
        table.rows[row].cells[column].className  = className;
    } else {
        if (emptyText) {
            if (column === 0) {
                text = "N/A"
            } else {
                text = "TBC";
            }
            table.rows[row].cells[column].className  = "empty-text mbr-fonts-style display-7";
        } else {
            table.rows[row].cells[column].className  = "body-text mbr-fonts-style display-7";
        }
    }
    table.rows[row].cells[column].innerHTML = text;
}

function lookupTeamName(competition, teamNumber) {
    if (teamNumber > 0) {
        var team = competition.getElementsByTagName("team")[teamNumber - 1];
        return team.getElementsByTagName("captain")[0].childNodes[0].nodeValue;
    }
    return "";
}

function populateCompetitionsForMaintenance(xml) {
    var xmlDoc = xml.responseXML;
    var html = "";
    var competitionName;

    var competitions = xmlDoc.getElementsByTagName("competition");

    for (i = 0; i < competitions.length; i++) {
        competitionName = competitions[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;

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

        html += "<div class=\"container scroll\">" +
            "<table id='myTable" + i + "' class=\"table isSearch\" cellspacing=\"0\">" +
            "<thead>" +
            "<tr class=\"table-heads \">";

        for (var i = 0; i < 64; i++) {
            html += "<th class=\"head-item mbr-fonts-style display-7\">Game " + i + "</th>";
        }

        html += "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>" +
            "</table>" +
            "<br>" +
            "<br>";
    }

    console.log(html);

    document.getElementById("competition_data").innerHTML = html;
}