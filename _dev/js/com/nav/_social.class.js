var Social = (function(window, undefined) {
    Social = {};

    var p = Social;

    p.shareFb = function(p_obj) {
        FB.ui({
                method: 'feed',
                name: p_obj.titulo || "",
                caption: p_obj.subtitulo || "",
                description: p_obj.descripcion || "",
                link: p_obj.url_app || "",
                picture: p_obj.thumbnail || ""
            },
            function(response) {

                if (response && response.post_id) {
                    p_obj.successShare && p_obj.successShare();
                    console.log('Post was published.');
                } else {
                    p_obj.errorShare && p_obj.errorShare();
                    console.log('Post was not published.');
                }
            });
    };
    p.shareTw = function(p_obj) {

        var texto = p_obj.copy;
        var url_corta = p_obj.url;
        var tweet_url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(texto + " " + url_corta);

        window.open(tweet_url, p_obj.urlTarget, "width=400, height=400");
    };

    p.toInstagram = function(p_obj) {
        window.open(p_obj.url, p_obj.urlTarget);
    }
    return Social;

})(window, undefined);
