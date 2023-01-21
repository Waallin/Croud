/*PUSH TO DB//////////

  async function pushData() {
    
    await setDoc(doc(database, "Games", uuidv4()), {
      active: false,
      orgName: orgData.OrgData,
      opponent: opponent,
      location: location,
      day: day,
      time: hour + "." + min,
    });
  }





GET FROM DB////////////

async function data() {

    const q = query(
      collection(database, "Games"),
      where("orgName", "==", "Admin")
    );

    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());

      let obj = {
        id: doc.id,
        opponent: doc.data().opponent,
        time: doc.data().time,
        day: doc.data().day,
        location: doc.data().location,
      };
      x.push(obj);

    });



      //filter on dates
     let dateFilter = x.sort(function (a, b) {
      return new Date(a.day) - new Date(b.day);
    });



    //Add or remove from array 

      //add to favourite or remove if we click again
  async function addOrg() {
    console.log(favOrNot)

    if (favOrNot == false)
    {
      const ref = doc(database, "Users", "Lars");
      await updateDoc(ref, {
        Favourites: arrayUnion(route.params.org.Name),
      });
      setFavOrNot(true); 
    } else {
      const ref = doc(database, "Users", "Lars");
      await updateDoc(ref, {
        Favourites: arrayRemove(route.params.org.Name)
    });
      setFavOrNot(false);
    }
  }


*/