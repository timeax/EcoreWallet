export function useParams() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");

    const params = {} as Record<string, string | undefined>;

    for (var i = 0; i < vars.length; i++) {
        var [key, value] = vars[i].split("=");

        params[key] = value?.replace(/%20/g, ' ');
    }

    return params;
}
