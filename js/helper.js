function getTypeColor(type) {
    type = type.toUpperCase();
    if (type == "NORMAL") {
        return "#C4BEAE";
    }
    if (type == "FIRE") {
        return "#EC993B";
    }
    else if (type == "FIGHTING") {
        return "#A12C2C";
    }
    else if (type == "WATER") {
        return "#2993DA";
    }
    else if (type == "FLYING") {
        return "#BAADDE";
    }
    else if (type == "GRASS") {
        return "#5DC04E";
    }
    else if (type == "POISON") {
        return "#9328DA";
    }
    else if (type == "ELECTRIC") {
        return "#FFDE35";
    }
    else if (type == "GROUND") {
        return "#DFB980";
    }
    else if (type == "PSYCHIC") {
        return "#FF007F";
    }
    else if (type == "ROCK") {
        return "#87632C";
    }
    else if (type == "ICE") {
        return "#5DBCD2";
    }
    else if (type == "BUG") {
        return "#9DC148";
    }
    else if (type == "DRAGON") {
        return "#6600CC";
    }
    else if (type == "GHOST") {
        return "#60447C";
    }
    else if (type == "DARK") {
        return "#5C4638";
    }
    else if (type == "STEEL") {
        return "#A0A0A0";
    }    
    else if (type == "FAIRY") {
        return "#FFCCFF";
    }
}

function showAll() {
//    console.log("Show all types");
    document.getElementById("all").className = "key general";
    document.getElementById("none").className = "key general inactive";
    document.getElementById("Bug").className = "key bug";
    document.getElementById("Dark").className = "key dark";
    document.getElementById("Dragon").className = "key dragon";
    document.getElementById("Electric").className = "key electric";
    document.getElementById("Fighting").className = "key fighting";
    document.getElementById("Fire").className = "key fire";
    document.getElementById("Flying").className = "key flying";
    document.getElementById("Ghost").className = "key ghost";
    document.getElementById("Grass").className = "key grass";
    document.getElementById("Ground").className = "key ground";
    document.getElementById("Ice").className = "key ice";
    document.getElementById("Normal").className = "key normal";
    document.getElementById("Poison").className = "key poison";
    document.getElementById("Psychic").className = "key psychic";
    document.getElementById("Rock").className = "key rock";
    document.getElementById("Steel").className = "key steel";
    document.getElementById("Water").className = "key water";  
    document.getElementById("Fairy").className = "key fairy";
    showAllDots();
}

function showNone() {
//    console.log("Show no types");
    document.getElementById("all").className = "key general inactive";
    document.getElementById("none").className = "key general";
    document.getElementById("Bug").className = "key bug inactive";
    document.getElementById("Dark").className = "key dark inactive";
    document.getElementById("Dragon").className = "key dragon inactive";
    document.getElementById("Electric").className = "key electric inactive";
    document.getElementById("Fighting").className = "key fighting inactive";
    document.getElementById("Fire").className = "key fire inactive";
    document.getElementById("Flying").className = "key flying inactive";
    document.getElementById("Ghost").className = "key ghost inactive";
    document.getElementById("Grass").className = "key grass inactive";
    document.getElementById("Ground").className = "key ground inactive";
    document.getElementById("Ice").className = "key ice inactive";
    document.getElementById("Normal").className = "key normal inactive";
    document.getElementById("Poison").className = "key poison inactive";
    document.getElementById("Psychic").className = "key psychic inactive";
    document.getElementById("Rock").className = "key rock inactive";
    document.getElementById("Steel").className = "key steel inactive";
    document.getElementById("Water").className = "key water inactive";  
    document.getElementById("Fairy").className = "key fairy inactive";
    hideAllDots();
}

function toggleType(button) {
	document.getElementById("all").className = "key general inactive";
    document.getElementById("none").className = "key general inactive";
    var element = document.getElementById(button.id);
    var classes = element.className.split(" ");
    //console.log(classes);
    
    // interact based on the filter
    if(classes.length == 2) {
    	element.className = classes[0] + " " + classes[1] + " " + "inactive";
    	hideType(button.id);
    } else {
    	element.className = classes[0] + " " + classes[1];
    	showType(button.id);
    }
    
}    
