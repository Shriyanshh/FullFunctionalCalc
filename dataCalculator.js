<!DOCTYPE html>
<html>

<head>
</head>

<body ng-app="dateDiff">
  <h1>JavaScript DateDiff to return years, months, days, Hours and Minutes</h1>
  <div ng-controller="index as vm">
    <p>Start Date:
      <input type="datetime-local" ng-model="vm.startDate" /> </p>
    <p>End Date:
      <input type="datetime-local" ng-model="vm.endDate" /> </p>
    <button ng-click="vm.getDiff()">Get Difference</button>
	<p></p>
	<div>
		Years: {{vm.result.years}} <br/>
		Months: {{vm.result.months}} <br/>
		Days: {{vm.result.days}} <br/>
		Hours: {{vm.result.hours}} <br/>
		Minutes: {{vm.result.minutes}} <br/>

	</div>

  </div>
  <script data-require="angular.js@1.5.0" data-semver="1.5.0" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.js"></script>
  <script data-require="moment.js@2.10.2" data-semver="2.10.2" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
  <script>
    angular.module('dateDiff', []);
    angular.module('dateDiff').value('moment', moment)


    angular.module('dateDiff').controller("index", index);
    index.$inject = ['moment'];
    function index(moment) {

      var vm = {
        startDate: undefined,
        endDate: undefined,
        result: {},
        getDiff: getDiff
      }

      init();
      return vm;

      function init() {}

      function getDiff() {
        var diff = dateDiff(vm.startDate, vm.endDate);

        if(diff !== undefined) {
          angular.extend(vm.result, diff)
        }
        else {
          alert('invalid start or end date');
        }
      }

      function dateDiff(startdate, enddate) {
        //define moments for the startdate and enddate
        var startdateMoment = moment(startdate);
        var enddateMoment = moment(enddate);

        if (startdateMoment.isValid() === true && enddateMoment.isValid() === true) {
          //getting the difference in years
          var years = enddateMoment.diff(startdateMoment, 'years');

          //to calculate the months, first get the previous year and then subtract it
          startdateMoment.add(years, 'years')
          var months = enddateMoment.diff(startdateMoment, 'months')

          //to calculate the days, first get the previous month and then subtract it
          startdateMoment.add(months, 'months');
          var days = enddateMoment.diff(startdateMoment, 'days')

          //Similar to days go the previous day
          startdateMoment.add(days, 'days')
          var hours = enddateMoment.diff(startdateMoment, 'hours')

    		  //Getting minutes
          startdateMoment.add(hours, 'hours')
          var minutes = enddateMoment.diff(startdateMoment, 'minutes')

		      //Similar to days go the previous day
          startdateMoment.add(minutes, 'minutes')
          var seconds = enddateMoment.diff(startdateMoment, 'seconds')

          return {
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          };

        }
        else {
          return undefined;
        }

      }
    }
  </script>
</body>

</html>
