// $(document).ready(function () {
//     var user_suggestions = new Bloodhound({
//         datumTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
//         queryTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
//         local: ['Apostolis', 'Filipas', 'Arguris', 'Alex', 'Fontas', 'Bagelis', 'Nikos', 'Kalantzis', 'Gallis', 'Kostas']
//     });



//     var substringMatcher = function (strs) {
//         console.log('strs', strs);
//         return function findMatches(q, cb) {
//             console.log('q', q);
//             var matches, substringRegex;

//             // an array that will be populated with substring matches
//             matches = [];
//             console.log('matches', matches);

//             // regex used to determine if a string contains the substring `q`
//             substrRegex = new RegExp(q, 'i');

//             // iterate through the pool of strings and for any string that
//             // contains the substring `q`, add it to the `matches` array
//             $.each(strs, function (i, str) {
//                 if (substrRegex.test(str)) {
//                     matches.push(str);
//                 }
//             });

//             console.log('matches', matches);

//             cb(matches);
//         };
//     };

//     $('#search-bar').typeahead({
//         hint: true,
//         highlight: true,
//         minLength: 1
//     },
//         {
//             name: 'user_suggestions',
//             source: user_suggestions  // Bloodhound instance is passed as the source
//         });
// })