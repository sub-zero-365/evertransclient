import axios from "axios"
export const getCities = async (inputValue = "") => {
    try {
        const res = await axios.get("/allcities", {
            params: {
                search: (inputValue || "")
            }
        })

        return res?.data?.cities
    } catch (err) {
        console.log(err)
        alert("some error occurs")
    }

}
export const getBuses = async (inputValue = "") => {
    try {
        const res = await axios.get("/bus",
            {
                params: {
                    search: inputValue || "",
                }
            }
        )
        const { buses } = res.data;
        
        const buses_name = buses.map(({ _id, name }) => ({
            label: name,
            value: _id,
        }))
        return buses_name
    } catch (err) {
        console.log("error : ", err)
        alert("error" + err.response.data)
        return err.response.data

    }

}