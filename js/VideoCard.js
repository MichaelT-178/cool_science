class VideoCard {
    constructor(image, title, description, link) {
        this.image = `../pics/${image}`;
        this.title = title;
        this.description = description;
        this.link = link
    }

    render(container) {
        const template = document.querySelector("#video-card-template").content.cloneNode(true);

        const videoLink = template.querySelector("#video-link");
        videoLink.href = this.link;

        template.querySelector('#pic').src = this.image;
        template.querySelector('#title').innerText = this.title;
        template.querySelector('#description').innerText = this.description;

        container.appendChild(template);
    }
}