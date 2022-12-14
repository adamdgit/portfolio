const calendarID = document.getElementById('datepicker-container');
const selectInput = document.getElementById('selected-dates');
const calendarBody = document.querySelector('.datepicker-body');
const monthSelect = document.querySelector('.pick-month-select')
const yearSelect = document.querySelector('.pick-year-select')
const selectedDays = document.querySelector('.selected-days')
let counter = 0

// Set default Year & Month selection to current year & month
yearSelect.value = new Date().getFullYear()
monthSelect.value = new Date().getMonth()

// show & hide calendar
selectInput.addEventListener('focus', () => {
	calendarID.classList.add('show')
});
// on click anywhere in document hide calendar
document.addEventListener('click', () => {
	calendarID.classList.remove('show')
});
// on click inside of calendar prevent hide
calendarID.addEventListener('click', (event) => {
	event.stopPropagation()
});
// on click inside input prevent hide
selectInput.addEventListener('click', (event) => {
	event.stopPropagation()
});

monthSelect.addEventListener('change', () => {
	showHideCalendarMonths()
	highlightSelection()
});

yearSelect.addEventListener('change', () => {
	showHideCalendarMonths()
	highlightSelection()
});

// render default calendar based on current date
calcCalendarDays();

// Creates each month & corresponding year into the HTML when selected
function showHideCalendarMonths() {

	let monthEl = document.querySelectorAll('.monthWrap')
	// If month hasn't been added to html, add to html
	if (!document.querySelector(`[data-month="${monthSelect.value}"][data-year="${yearSelect.value}"]`)) {
		calcCalendarDays()
		monthEl.forEach(month => {
			month.classList.add('hide')
			month.classList.remove('show')
		})
		document.querySelector(`[data-month="${monthSelect.value}"][data-year="${yearSelect.value}"]`).classList.add('show')
		document.querySelector(`[data-month="${monthSelect.value}"][data-year="${yearSelect.value}"]`).classList.remove('hide')
	}
	// if month has already been added to html show the selected month and hide others
	else if (document.querySelector(`[data-month="${monthSelect.value}"][data-year="${yearSelect.value}"]`)) {
		monthEl.forEach(month => {
			month.classList.add('hide')
			month.classList.remove('show')
		})
		document.querySelector(`[data-month="${monthSelect.value}"][data-year="${yearSelect.value}"]`).classList.add('show')
		document.querySelector(`[data-month="${monthSelect.value}"][data-year="${yearSelect.value}"]`).classList.remove('hide')
	}
}

// populate body of calendar with accurate days of selected month & year
function calcCalendarDays() {
	// Date variables to calculate previous, current and next months dates
	let selectedMonth = Number(monthSelect.value);
	let selectedYear = Number(yearSelect.value);
	let currentMonth = new Date(selectedYear, selectedMonth, 1);
	let firstDayPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();
	// getDay() returns day as int 0=sun, 1=mon.. 6=sat etc
	let firstDayMonth = new Date(selectedYear, selectedMonth, 1, 0).getDay();
	// Sunday is counted as 0, must convert to 7 for calculations below
	if (firstDayMonth == 0) { firstDayMonth = 7; }
	let calc = (firstDayPrevMonth + 1) - (firstDayMonth - 1);
	let prevMonth = new Date(selectedYear, selectedMonth - 1, calc);
	let lastDayMonth = new Date(selectedYear, selectedMonth + 1, 0).getDay();
	let nextMonth = new Date(selectedYear, selectedMonth + 1, 1);

	// each time a new month is selected we build the month into
	// the calendars HTML with a new div and related days
	let monthWrap = document.createElement('div')
	monthWrap.dataset.month = selectedMonth
	monthWrap.dataset.year = selectedYear
	monthWrap.classList.add('monthWrap')
	calendarBody.appendChild(monthWrap)

	// show some days from previous month
	for (let i = (firstDayPrevMonth + 1) - firstDayMonth; i < firstDayPrevMonth; i++) {
		let prevMonthDays = new Date(prevMonth);
		prevMonth.setDate(prevMonth.getDate() + 1);
		insertDaysHTML(prevMonthDays, 'date not-current-month', monthWrap);
	}
	// current month calc
	while (currentMonth.getMonth() === selectedMonth) {
		let currentMonthDays = new Date(currentMonth);
		currentMonth.setDate(currentMonth.getDate() + 1);
		insertDaysHTML(currentMonthDays, 'date', monthWrap);
	}
	// show some days from next month
	for (let i = 1; i <= 7 - lastDayMonth; i++) {
		let nextMonthDays = new Date(nextMonth);
		nextMonth.setDate(nextMonth.getDate() + 1);
		insertDaysHTML(nextMonthDays, 'date not-current-month', monthWrap);
	}
	// adds event listeners to all days in the calendar
	addDaysEventListeners()
}

// converts long date into short date and inserts html to calendar body
function insertDaysHTML(date, elementClass, month) {

	let convertedDate = date.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' });
	let d = date.toLocaleString('en-us', { day: '2-digit' });
	const newDay = `<option class="${elementClass}" value="${convertedDate}">${d}</option>`;
	month.insertAdjacentHTML('beforeend', newDay);
}

function addDaysEventListeners() {

	let monthEl = calendarBody.querySelector(`[data-month="${monthSelect.value}"][data-year="${yearSelect.value}"]`)
	monthEl.childNodes.forEach(day => {
		// highlight current date in calendar
		if (day.value == new Date().toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' })) {
			day.classList.add('today');
		}
		day.addEventListener('click', (e) => {
			selectedRange(e);
		})
	})
}

// highlights user selected days in the calendar
function selectedRange(e) {

	if (e.target && counter === 0) {
		// reset selection before starting new one
		selectInput.value = ''
		selectedDays.innerHTML = ''
		calendarBody.querySelectorAll(`[class*='highlight']`).forEach(day => {
			day.classList.remove('highlight-from')
			day.classList.remove('highlight-to')
			day.classList.remove('highlight-range')
		})
		counter++
		fromDate = e.target
		fromDate.classList.add('highlight-from')
		selectInput.value = `${fromDate.value} - `
	} else if (fromDate && counter === 1) {
		// if true selected dates are invalid
		if (validateDates(e.target.value, fromDate.value)) {
			return alert('Invalid selection')
			// else dates are valid, add selection
		}
		counter = 0
		toDate = e.target
		toDate.classList.add('highlight-to')
		selectInput.value = selectInput.value + toDate.value
		highlightSelection()
		let numberOfDays = numberOfDaysSelected(fromDate, toDate)
		selectedDays.innerHTML = numberOfDays
	}
}

function validateDates(to, from) {
	// prevents highlighting days that occur before initial selection
	let fromDate = Date.parse(from).toLocaleString('en-us')
	let toDate = Date.parse(to).toLocaleString('en-us')

	if (toDate <= fromDate) {
		return true
	} else {
		return false
	}
}

function highlightSelection() {

	let monthElements = calendarBody.querySelectorAll('.monthWrap')
	let fromDate = calendarBody.querySelector('.highlight-from')
	let toDate = calendarBody.querySelector('.highlight-to')
	// check if days already selected need to be highlighted as some dates
	// occur multiple times between calendar changes (prev & next month days)
	if (fromDate || toDate) {
		monthElements.forEach(month => {
			month.childNodes.forEach(day => {
				if (day.value === fromDate.value) day.classList.add('highlight-from')
				// add highlight range to days between selection using date comparisons
				if (Date.parse(day.value) > Date.parse(fromDate.value)
					&& Date.parse(day.value) < Date.parse(toDate.value)) {
					day.classList.add('highlight-range')
				}
				if (day.value === toDate.value) {
					day.classList.add('highlight-to')
				} else { return }
			})
		})
	} else {
		return null
	}
}

// get difference of two dates as milliseconds, convert to days
function numberOfDaysSelected(fromDate, toDate) {

	let date1 = new Date(fromDate.value)
	let date2 = new Date(toDate.value)

	let timeDifference = date2.getTime() - date1.getTime()
	let daysDifference = timeDifference / (1000 * 3600 * 24) + 1

	return (daysDifference)
}