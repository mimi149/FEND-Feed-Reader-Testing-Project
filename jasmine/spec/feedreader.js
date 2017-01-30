/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
	/* This test suite is all about the RSS feeds definitions,
	 * the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function () {

		// Test to ensure the allFeeds variable has been defined and not empty
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		// Test to ensure all the feeds have the URLs defined and they are not empty.
		it('every item of allFeeds has a not empty URL', function () {
			expect((function () {
				var testResult = true;
				allFeeds.forEach(function (item) {
					testResult = testResult && (item.url && item.url != "");
				})
				return testResult;
			})()).toBe(true);
		});

		// Test to ensure all the feeds have the names defined and they are not empty.
		it('every item of allFeeds has a not empty name', function () {
			expect((function () {
				var testResult = true;
				allFeeds.forEach(function (item) {
					testResult = testResult && (item.name && item.name != "");
				})
				return testResult;
			})()).toBe(true);
		});
	});

	/**
	 * This test suite is for testing correct functionality of the slice menu.
	 */
	describe('The menu ', function () {

		// Tests to ensure the slice menu is hidden by default.
		it('menu is hidden by default', function () {
			expect($('body').attr('class')).toBe("menu-hidden");
		});

		/**
		 * This inner test suite tests the behavior of the slice menu on click events.
		 */
		describe('icon is clicked,', function () {

			// Click on the menu icon before each function call.
			beforeEach(function () {
				$('.menu-icon-link').click();
			});

			// Test to ensure the slice menu is displayed.
			it('the menu is displayed correctly, ', function () {
				expect($('body').hasClass('menu-hidden')).toBeFalsy();
			});

			// Test to ensure the slice menu is hidden again.
			it('then click on the icon, the menu is hidden correctly', function () {
				expect($('body').hasClass('menu-hidden')).toBeTruthy();
			});
		});
	});


	/**
	 * This test suite is for testing loadFeed() function when page is loaded.
	 */
	describe('Initial Entries', function () {

		// Call loadFeed() for initial entries, loadFeed() function will call done() when it's done.
		beforeEach(function (done) {
			loadFeed(0, function () {
				done();
			});
		});

		// Test to ensure there is at least a single .entry element within the .feed container.
		it('.feed contains at least an .entry element when the loadFeed completes its work', function (done) {
			console.log('feed: ', $('.feed'));
			expect($('.feed').length).toBeGreaterThan(0);
			done();
		})
	});


	/**
	 * This test suite is for testing loadFeed() function when new feed is selected.
	 */
	describe('New Feed Selection', function () {

		var prevContent, newContent;

		// Store the content of the initial screen then load the new feed.
		beforeEach(function (done) {
			prevContent = $('.feed').text();
			loadFeed(1, done);
		});

		// Test to ensure that content is actually changed when a new feed is loaded.
		it('when a new feed is loaded by the loadFeed function the content actually changes', function (done) {
			newContent = $('.feed').text();
			expect(prevContent).not.toBe(newContent);
			done();
		})
	});

}());
