const ALBUMS_API = 'https://jsonplaceholder.typicode.com/albums'
const PHOTOS_API = 'https://jsonplaceholder.typicode.com/photos'

Vue.directive('scroll', {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})

Vue.component('data-table', {
    data() {
        return {
            searchedPhotos: [],
            posts: [],
            limit: 25,
            busy: false,
            error: '',
            order: false,
            currentSort: 'albumID',
            currentSortDir: 'asc',
            search: ''
        }

    },
    computed: {
        sortedPosts() {

            if (this.search) {
                return this.posts.filter(post => {
                    return post.title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
            return this.posts.sort((a, b) => ((this.currentSortDir === 'asc') && (a[this.currentSort] > b[this.currentSort])) ? 1 : -1)
        }
    },
    methods: {
        loadMore() {
            console.log("Adding 25 more data results");
            this.busy = true;
            const append = this.searchedPhotos.slice(
                this.posts.length,
                this.posts.length + this.limit
            );
            this.posts = this.posts.concat(append);
            this.busy = false;
            console.log("PP ", this.posts)
        },
        handleScroll(evt, el) {
            let onBottom = (document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight;
            if (onBottom) {
                this.loadMore();
            }
        },
        toggleSort(itemName) {
            if (itemName === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
            }
            this.currentSort = itemName;
        }
    },
    created() {
        Promise.all([
            axios.get(PHOTOS_API),
            axios.get(ALBUMS_API)
        ]).then(([{ data: photos }, { data: albums }]) => {
            let albumsData = albums.reduce((map, album) => ({ ...map, [album.id]: album }), {})
            this.searchedPhotos = photos.map((photo) => ({ ...photo, albumTitle: albumsData[photo.albumId].title }))
            this.loadMore()
        }).catch(err => this.error = "Loading error")
    },
    template: `
    <div class="wrapper">
        <div v-if="posts.length === 0 && !error"> Loading... </div>
        <div v-else-if="!error">
            <table v-scroll="handleScroll" class="table table-fixed">

            <thead class="position-fixed">
             <input v-model="search" class="form-control mr-sm-2 border border-primary" type="search" placeholder="Search">
                <tr >
                    <th scope="col">
                        <button class="btn btn-outline-secondary" @click="toggleSort('albumId')">album.id</button>
                    </th>
                    <th scope="col">
                        <button class="btn btn-outline-secondary" @click="toggleSort('albumTitle')">album.title</button>
                    </th>
                    <th scope="col">
                        <button class="btn btn-outline-secondary" @click="toggleSort('title')">photos.title</button> 
                    </th>
                    <th scope="col">photos.thumbnail</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for='album in sortedPosts' key='album.albumId'>  
                    <th scope="row">{{album.albumId}}</th>
                    <td>{{album.albumTitle}}</td>
                    <td>{{album.title}}</td>
                    <td><img width="150" height="150" :src="album.thumbnailUrl"/></td>
                </tr>
            </tbody>

            </table >
        </div> 
        <div v-else={{error}}</div>
    </div>
`
})

new Vue({
    el: '#root',
    components: 'data-table'
})
