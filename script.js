
let Cities = (function () {
            function pageLoaded() {
                return new Promise(function (resolve) {
                    if (document.readyState == 'complete') {
                        resolve();
                    } else {
                        window.onload = resolve;
                    }
                });
            };

            function returnCities(url) {
                fetch(url)
                    .then(function (response) {
                        if (response.status !== 200) {
                            console.log('' + 'Looks like there was a problem. Status Code: ' + response.status);
                            return;
                        } else {
                            return response.json();
                        }
                    })
                    .then(function (data) {
                        return returnSortedArray(data);
                    }).then(
                    sortedArray => {
                        events(sortedArray);
                        addToDom(sortedArray);
                    },
                    error => {
                        alert("Rejected: " + error);
                    }
                ).catch(alert);
            }

            function returnSortedArray(data) {
                let arr = Object.keys(data).map(function (i) {
                    return data[i].name
                });
                let sortedArray = arr.sort();
                return sortedArray;
            }

            var citiesContent = document.getElementById("cities");

            function addToDom(array) {
                let alert = document.querySelector(".alert");
                if(array == false) {
                    alert.className = ('alert alert-danger');
                } else  {
                    alert.className = ('alert alert-danger hidden');
                    for (var i = 0; i < array.length; i++) {
                        var item = document.createElement('li');
                        item.classList.add("list-group-item");
                        var textnode = document.createTextNode(array[i]);
                        item.appendChild(textnode);
                        citiesContent.appendChild(item);
                    }
                }
            }

            function events(arr) {
                let array = arr;
                let cityNameInput = document.querySelector('.city-name');
                cityNameInput.addEventListener('input', function (e) {
                    [].slice.call( citiesContent.querySelectorAll('li')).forEach(
                        function(v){
                            v.parentNode.removeChild(v);
                        }
                    );
                    let strInput = cityNameInput.value.toLowerCase();
                    let	resultAfterfilter = arr.filter(
                        city => new RegExp(this.value, 'i').test(city)
                    );
                    if (this.value) {
                        if (resultAfterfilter.length == 0) {
                            addToDom(false);
                        } else {
                            addToDom(resultAfterfilter);
                        }
                    } else {
                        addToDom(resultAfterfilter);
                    }
                })
            }

            let init = (url) => {
                pageLoaded().then(() => {
                    returnCities(url);
                })
            }
            return {
                init: init
            };
        }());

Cities.init('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');

