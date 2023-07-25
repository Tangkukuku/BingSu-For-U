export const fetcherCreate = (url:any, data:any) =>
  fetch(window.location.origin + url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => {
    return r.json();
  });

export const fetcherRead = (url:any, data:any) =>
    fetch(window.location.origin + url, {
        method:"POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((r) => {
        return r.json();
    });
export const fetcherUpdate = (url:any, data:any) =>
    fetch(window.location.origin + url, {
        method:"PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((r) => {
        return r.json();
    });
export const fetcherDelete = (url:any) =>
    fetch(window.location.origin + url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },

    }).then((r) => {
        return r.json();
    });
export const fetcherAuthLogin = (url:any, data:any) =>
    fetch(window.location.origin + url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((r) => {
        return r.json();
    });
