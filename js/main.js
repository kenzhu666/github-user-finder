$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let result = e.target.value
        console.log(result)

        $.ajax({
            url:'https://api.github.com/users/'+result,
            data:{
                client_id:'b163548471d390b297df',
                client_secret: 'bc72cd640dfdbd3e3243e13f0ee5725468115775'
            }
        }).done(function(r){
            $.ajax({
                url:'https://api.github.com/users/'+result+'/repos',
                data:{
                    client_id:'b163548471d390b297df',
                    client_secret: 'bc72cd640dfdbd3e3243e13f0ee5725468115775'
                },
                sort: 'create: asc',
                per_page: 5
            }).done(function(repos){
                $.each(repos,function(i,repo){
                    $('#repos').append(`
                    <div class="card">
                    <div class="row">
                      <div class="col-md-7">
                        <strong>${repo.name}</strong>: ${repo.description}
                      </div>
                      <div class="col-md-3">
                        <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                        <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                      </div>
                      <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                      </div>
                    </div>
                  </div>
                    `)
                })
            });

            console.log(r)
            $('#content').html(`
            <div class="card border-primary mb-3" style="max-width: 100rem;">
            <div class="card-header"><h3>${r.name}</h3></div>
            <div class="card-body">
              <div class="row">
              <div class="col-md-3">
                <img class="img-thumbnail avatar" src="${r.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${r.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-success">Followers: ${r.followers}</span>
                <span class="badge badge-info">Following: ${r.following}</span>
                <span class="badge badge-dark">Public Repos: ${r.public_repos}</span>
                <span class="badge badge-primary">Public Gists: ${r.public_gists}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Location: ${r.location}</li>
                  <li class="list-group-item">Company: ${r.company}</li>
                  <li class="list-group-item">Website/blog: <a href="${r.blog}" target="_blank">${r.blog}</a></li>
                  <li class="list-group-item">Member Since: ${r.created_at}</li>
                </ul>
                </div>
              </div>
            </div>
          </div>
          <h4 class="page-header" id='repost'>Latest Repos</h4>
          <div id="repos"></div>
            `)
        })
    });
});