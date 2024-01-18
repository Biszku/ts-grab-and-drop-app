const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 2000);
});

const getData = async () => {
  const data = await myPromise;
  console.log(data);
};

export default getData;
