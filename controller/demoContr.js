exports.getDemo = (req, res) =>
{
    let obj = {
        name: "龍哥",
        age: 28,
        girlfriends: ["小麗", "球球", "小翠", "小花", "艷艷", "小敏", "貝貝"]
    };
    res.render("demo", obj);
}