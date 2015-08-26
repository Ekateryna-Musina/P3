/* Bio information */

var bio = {
    name: "Kateryna Musina",
    role: "software developer",
    contacts: {
        social: [{
            data: "https://twitter.com/katya_ms",
            img: "images/icons/twitter.svg",
        }, {
            data: "https://github.com/Ekateryna-Musina",
            img: "images/icons/github.svg",
        }, {
            data: "skype://kate.kotsar",
            img: "images/icons/skype.svg",
        }, {
            data: "https://dk.linkedin.com/pub/ekaterina-musina/19/bb2/295",
            img: "images/icons/linkedin.svg",
        }],
        personal: [{
            data: "tel:+4593921429",
            img: "&#x260E",
            text: "+4593921429"
        }, {
            data: "mailto:kate.kotsar@gmail.com",
            img: "&#9993",
            text: "ekaterina.musina@gmail.com"
        }, 
        {   data: "https://www.google.com/maps?q=Copenhagen,+Denmark",
            img: "&#127968",
            text: "Copenhagen, Denmark"
        }]
    },
    location: "Denmark",
    picture: "images/photo.png",   
    welcomeMessage: "Hello, I am Front-End developer, review my skills. Dummy text, dummy text, dummy text, dummy text, dummy text, text.",
    skills: [{
        label: "JavaScript",
        value: 80
    }, {
        label: ".NET",
        value: 90
    }, {
        label: "CSS",
        value: 60
    }, {
        label: "GIT",
        value: 70
    }, {
        label: "GRUNT",
        value: 60
    }, {
        label: "Python",
        value: 30
    }, {
        label: "HTML",
        value: 60
    }],
    display: function() {
        $.each(bio.contacts.social, function(i, obj) {
            var element = replaceDataPlaceholder(replaceUrlPlaceholder(HTMLIconLogo, obj.img), obj.data);
            $("#hdTopContacts").append(element);
            $("#footerBottomContacts").append(element);
        });
        $.each(bio.contacts.personal, function(i, obj) {
            var element = replaceDataPlaceholder(replaceUrlPlaceholder(replaceTextPlaceholder(HTMLcontact, obj.text), obj.img), obj.data);
            $("#contactList").append(element);

        });



        /* Skills : building skills element */
        var skillsList = "";
        for (var i = 0; i < bio.skills.length; i++) {
            skillsList = skillsList.concat(replaceDataPlaceholder(HTMLskills, bio.skills[i]));
        };

        $("#name").prepend(replaceDataPlaceholder(HTMLheaderName, bio.name),
            replaceDataPlaceholder(HTMLheaderRole, bio.role));


var welcomeEntry = $(HTMLGenericStart);
welcomeEntry.append(replaceDataPlaceholder(HTMLwelcomeMsg, bio.welcomeMessage));
        $("#welcome").append(welcomeEntry);

        $("#photo").append(replaceDataPlaceholder(HTMLbioPic, bio.picture));

        this.displaySkills();
    },

    displaySkills: function() {
        var svg = d3.select(".skills")
            .append("svg")
            .append("g")

        svg.append("g")
            .attr("class", "slices");
        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
            .attr("class", "lines");

        var width = 960,
            height = 450,
            radius = Math.min(width, height) / 2;

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.value;
            });

        var arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);

        var outerArc = d3.svg.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var key = function(d) {
            return d.data.label;
        };

        var color = d3.scale.ordinal()
            .domain(["JavaScript", ".NET", "HTML", "CSS", "GIT", "GRUNT", "Nant", "Python"])
            .range(["#98abc5", "#8a89a6", "#6b486b", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


        var values = [{
            label: "JavaScript",
            value: 30
        }, {
            label: ".NET",
            value: 30
        }, {
            label: "CSS",
            value: 30
        }, {
            label: "GIT",
            value: 30
        }, {
            label: "GRUNT",
            value: 30
        }, {
            label: "Nant",
            value: 30
        }, {
            label: "Python",
            value: 30
        }, {
            label: "HTML",
            value: 30
        }];

        function randomData() {
            var labels = color.domain();
            return values;
        }


        change(randomData());

        d3.select(".randomize")
            .on("click", function() {
                change(randomData());
            });


        function change(data) {

            /* ------- PIE SLICES -------*/
            var slice = svg.select(".slices").selectAll("path.slice")
                .data(pie(data), key);

            slice.enter()
                .insert("path")
                .style("fill", function(d) {
                    return color(d.data.label);
                })
                .attr("class", "slice");

            slice
                .transition().duration(1000)
                .attrTween("d", function(d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                })

            slice.exit().remove();

            /* ------- TEXT LABELS -------*/

            var text = svg.select(".labels").selectAll("text")
                .data(pie(data), key);

            text.enter()
                .append("text")
                .attr("dy", ".35em")
                .text(function(d) {
                    return d.data.label;
                });

            function midAngle(d) {
                return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }

            text.transition().duration(1000)
                .attrTween("transform", function(d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                        return "translate(" + pos + ")";
                    };
                })
                .styleTween("text-anchor", function(d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        var d2 = interpolate(t);
                        return midAngle(d2) < Math.PI ? "start" : "end";
                    };
                });

            text.exit().remove();

            /* ------- SLICE TO TEXT POLYLINES -------*/

            var polyline = svg.select(".lines").selectAll("polyline")
                .data(pie(data), key);

            polyline.enter()
                .append("polyline");

            polyline.transition().duration(1000)
                .attrTween("points", function(d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                        return [arc.centroid(d2), outerArc.centroid(d2), pos];
                    };
                });

            polyline.exit()
                .remove();
        };
    }
}

var work = {
    jobs: [{
        employer: "Sitecore",
        title: "Software developer",
        location: "Denmark",
        dates: "August 2008 - July 2015",
        url: "http://www.sitecore.net/",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }, {
        employer: "ISD",
        title: "Software engineer",
        location: "Ukraine",
        dates: "April 2007-July 2008",
        url: "http://isd.dp.ua/en/",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }],
    display: function() {
        for (jobIndex in work.jobs) {
            var job = work.jobs[jobIndex];

            var rowEntry = $(HTMLGenericStart);
            rowEntry.append(
                replaceDataPlaceholder(replaceUrlPlaceholder(HTMLworkEmployer, job.url), job.employer) + replaceDataPlaceholder(HTMLworkTitle, job.title),
                replaceDataPlaceholder(HTMLworkDates, job.dates) +
                replaceDataPlaceholder(HTMLworkLocation, job.location),
                replaceDataPlaceholder(HTMLworkDescription, job.description));
            $("#workExperience").append(rowEntry);
        }
    }
};

var projects = {
    projects: [{
        title: "Sample 1",
        dates: "January 2013 - June 2013",
        description: "1Projects Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  est laborum.",
        url: "#",
        image: "images/code.jpg"
    }, {
        title: "Sample 2",
        dates: "January 2012 - June 2012",
        description: "2Projects Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  est laborum.",
        url: "#",
        image: "images/cd.jpg"
    },{
        title: "Sample 3",
        dates: "January 2012 - June 2012",
        description: "3Projects Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  est laborum.",
        url: "#",
        image: "images/wb.jpg"
    }, {
        title: "Sample 4",
        dates: "January 2012 - June 2012",
        description: "4Projects Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  est laborum.",
        url: "#",
        image: "images/plane.jpg"
    }],
    display: function() {
        for (var projectIndex in this.projects) {

            var project = this.projects[projectIndex];
            var projectEntry = $(HTMLProjectStart);            

            projectEntry.append(replaceDataPlaceholder(HTMLprojectImage, project.image));
         
            var projectOverlay = $(HTMLprojectData);

            projectEntry.append(projectOverlay);
                       
              projectOverlay.append(replaceDataPlaceholder(HTMLprojectTitle, project.title),
                replaceDataPlaceholder(HTMLprojectDates, project.dates),
                replaceDataPlaceholder(HTMLprojectDescription, project.description),
                replaceDataPlaceholder(HTMLprojectLink, project.url));         
  $("#projects-list").append(projectEntry);
         
        }
    }
};

var education = {
    schools: [{
        name: "National University of Dnipropetrovsk",
        location: "Ukraine",
        degree: "Master's in Computer Science",
        description: "The Department of Calculating Mathematics and Mathematical Cybernetics. Field of study - Applied Mathematics",
        majors: [],
        dates: "2003 - 2008",
        url: "http://www.dnu.dp.ua/en/faculty_of_applied_mathematics"
    }],
    onlineCourses: [{
        title: "MongoDB for Developers",
        school: "MongoDB University",
        date: "2015",
        url: "https://university.mongodb.com/"
    }],
    display: function() {
        var education = $("#education");
        for (var schoolIndex in this.schools) {
            var educationEntry = $(HTMLGenericStart);

            var school = this.schools[schoolIndex];

            educationEntry.append(replaceDataPlaceholder(replaceUrlPlaceholder(HTMLschoolName, school.url), school.name) +
                replaceDataPlaceholder(HTMLschoolDegree, school.degree),
                replaceDataPlaceholder(HTMLschoolDates, school.dates) +
                replaceDataPlaceholder(HTMLschoolLocation, school.location),
                replaceDataPlaceholder(HTMLscoolDescription, school.description));

            for (var majorIndex in school.majors) {
                educationEntry.append(replaceDataPlaceholder(HTMLschoolMajor, school.majors[majorIndex]));
            }

            education.append(educationEntry);
        }

        if (this.onlineCourses.length > 0) {
            education.append(HTMLonlineClasses);
        }

        for (var courseIndex in this.onlineCourses) {


            var courseEntry = $(HTMLGenericStart);

            var course = this.onlineCourses[courseIndex];

            courseEntry.append(
                replaceDataPlaceholder(replaceUrlPlaceholder(HTMLonlineTitle, course.url), course.title) +
                replaceDataPlaceholder(HTMLonlineSchool, course.school),
                replaceDataPlaceholder(HTMLonlineDates, course.date));

            education.append(courseEntry);
        }
    }
};




function locationizer(work) {
    var locs = [];
    for (var jobIndex in work.jobs) {
        locs.push(work.jobs[jobIndex].location);
    }
    return locs;
}

function replaceDataPlaceholder(pattern, data) {
    return replacePlaceholder(pattern, "%data%", data);
}

function replaceUrlPlaceholder(pattern, data) {
    return replacePlaceholder(pattern, "%url%", data);
}

function replaceTextPlaceholder(pattern, data) {
    return replacePlaceholder(pattern, "%text%", data);
}

function replacePlaceholder(pattern, placenolderName, data) {
    if (pattern.indexOf(placenolderName) > -1) {
        return pattern.replace(placenolderName, data);
    }
    return pattern;
}

$("#mapDiv").append(googleMap);

bio.display();
projects.display();
education.display();
work.display();