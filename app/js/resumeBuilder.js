/* Bio information */
var bio = {
  name: "Kateryna Musina",
  role: "software developer",
  contacts: {
    social: [{
      data: "https://twitter.com/katya_ms",
      img: "img/icons/twitter.svg",
    }, {
      data: "https://github.com/Ekateryna-Musina",
      img: "img/icons/github.svg",
    }, {
      data: "skype://kate.kotsar",
      img: "img/icons/skype.svg",
    }, {
      data: "https://dk.linkedin.com/pub/ekaterina-musina/19/bb2/295",
      img: "img/icons/linkedin.svg",
    }],
    personal: [{
      data: "tel:+4593921429",
      img: "&#x260E",
      text: "+4593921429"
    }, {
      data: "mailto:kate.kotsar@gmail.com",
      img: "&#9993",
      text: "ekaterina.musina@gmail.com"
    }, {
      data: "https://www.google.com/maps?q=Copenhagen,+Denmark",
      img: "&#127968",
      text: "Copenhagen, Denmark"
    }]
  },
  location: "Denmark",
  picture: "img/photo.png",
  welcomeMessage: "Hello, I am Front-End developer, review my skills. Dummy text, dummy text, dummy text, dummy text, dummy text, text.",
  skills: [{
    text: "JavaScript",
    count: 30
  }, {
    text: ".NET",
    count: 92
  }, {
    text: "HTML5/CSS3",
    count: 50
  }, {
    text: "GIT/SVN",
    count: 60
  }, {
    text: "GRUNT",
    count: 40
  }, {
    text: "MongoDB",
    count: 75
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
    $("#name").prepend(replaceDataPlaceholder(HTMLheaderName, bio.name), replaceDataPlaceholder(HTMLheaderRole, bio.role));
    var welcomeEntry = $(HTMLGenericStart);
    welcomeEntry.append(replaceDataPlaceholder(HTMLwelcomeMsg, bio.welcomeMessage));
    $("#welcome").append(welcomeEntry);
    $("#photo").append(replaceDataPlaceholder(HTMLbioPic, bio.picture));
    this.displaySkills();
  },
  displaySkills: function() {
    var skillsEntry = $("#skills .row-entry");
    for (var i = 0; i < this.skills.length; i++) {
      var skill = $(HTMLskill);
      skillsEntry.append(skill);
      displaySkill(skill[0], this.skills[i].text, this.skills[i].count);
    }
  }
};

var work = {
  jobs: [{
    employer: "Employer1",
    title: "Software developer",
    location: "Denmark",
    dates: "August 2008 - July 2015",
    url: "#",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  }, {
    employer: "Employer2",
    title: "Software engineer",
    location: "Ukraine",
    dates: "April 2007-July 2008",
    url: "h#",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  }],
  display: function() {
    for (var i = 0; i < this.jobs.length; i++) {
      var job = this.jobs[i];
      var rowEntry = $(HTMLGenericStart);
      rowEntry.append(replaceDataPlaceholder(replaceUrlPlaceholder(HTMLworkEmployer, job.url), job.employer) + replaceDataPlaceholder(HTMLworkTitle, job.title), replaceDataPlaceholder(HTMLworkDates, job.dates) + replaceDataPlaceholder(HTMLworkLocation, job.location), replaceDataPlaceholder(HTMLworkDescription, job.description));
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
    image: "img/code.jpg"
  }, {
    title: "Sample 2",
    dates: "January 2012 - June 2012",
    description: "2Projects Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  est laborum.",
    url: "#",
    image: "img/cd.jpg"
  }, {
    title: "Sample 3",
    dates: "January 2012 - June 2012",
    description: "3Projects Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  est laborum.",
    url: "#",
    image: "img/wb.jpg"
  }, {
    title: "Sample 4",
    dates: "January 2012 - June 2012",
    description: "4Projects Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  est laborum.",
    url: "#",
    image: "img/plane.jpg"
  }],
  display: function() {
    for (var i = 0; i < this.projects.length; i++) {
      var project = this.projects[i];
      var projectEntry = $(HTMLProjectStart);
      projectEntry.append(replaceDataPlaceholder(HTMLprojectImage, project.image));
      var projectOverlay = $(HTMLprojectData);
      projectEntry.append(projectOverlay);
      projectOverlay.append(replaceDataPlaceholder(HTMLprojectTitle, project.title), replaceDataPlaceholder(HTMLprojectDates, project.dates), replaceDataPlaceholder(HTMLprojectDescription, project.description), replaceDataPlaceholder(HTMLprojectLink, project.url));
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
    title: "Course 1",
    school: "School1",
    date: "2015",
    url: "#"
  }, {
    title: "Course 2",
    school: "School3",
    date: "2015",
    url: "#"
  }, {
    title: "Course 3",
    school: "School3",
    date: "2015",
    url: "#"
  }],
  display: function() {
    var education = $("#education");
    for (var i = 0; i < this.schools.length; i++) {
      var educationEntry = $(HTMLGenericStart);
      var school = this.schools[i];
      educationEntry.append(replaceDataPlaceholder(replaceUrlPlaceholder(HTMLschoolName, school.url), school.name) + replaceDataPlaceholder(HTMLschoolDegree, school.degree), replaceDataPlaceholder(HTMLschoolDates, school.dates) + replaceDataPlaceholder(HTMLschoolLocation, school.location), replaceDataPlaceholder(HTMLscoolDescription, school.description));
      for (var j = 0; j < school.majors.length; j++) {
        educationEntry.append(replaceDataPlaceholder(HTMLschoolMajor, school.majors[j]));
      }
      education.append(educationEntry);
    }

    if (this.onlineCourses.length > 0) {
      education.append(HTMLonlineClasses);
    }
    for (var k = 0; k < this.onlineCourses.length; k++) {
      var courseEntry = $(HTMLGenericStart);
      var course = this.onlineCourses[k];
      courseEntry.append(replaceDataPlaceholder(replaceUrlPlaceholder(HTMLonlineTitle, course.url), course.title) + replaceDataPlaceholder(HTMLonlineSchool, course.school), replaceDataPlaceholder(HTMLonlineDates, course.date));
      education.append(courseEntry);
    }
  }
};

function displaySkill(id, label, value) {
  var div = d3.select(id);
  var rp = radialProgress(id)
    .label(label)
    .diameter(120)
    .value(value)
    .render();
}

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

$("#map").append(map);

bio.display();
projects.display();
education.display();
work.display();
