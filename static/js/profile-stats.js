const apiUrl = 'https://api.abhinavkm.com/githubRepos';

fetch(apiUrl)
  .then(response => {

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  })
  .then(data => {
    console.log(data)
    // data.sort(function(a, b) {
    //   return b.stargazers_count - a.stargazers_count;
    // })
    // // sort in DESC order

    // console.log(data[0])


  })
  .catch(error => {

    console.error('There was a problem with the fetch operation:', error);
  });


window.onload = function(e){
    console.log("Project stats")
}
