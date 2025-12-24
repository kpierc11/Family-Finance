#include <httplib.h>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

void set_cors(httplib::Response &res)
{
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

int main()
{
    using namespace httplib;

    Server svr;

    svr.Options(R"(.*)", [](const httplib::Request &, httplib::Response &res)
                {
    set_cors(res);
    res.status = 200; });

    svr.Get("/hi", [](const Request &req, Response &res)
            {
                res.set_header("Access-Control-Allow-Origin", "*");
                res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                res.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
                json j2 = {
                                {"pi", 3.141},
                                {"happy", true},
                                {"name", "Niels"},
                                {"nothing", nullptr},
                                {"answer", {
                                    {"everything", 42}
                                }},
                                {"list", {1, 0, 2}},
                                {"object", {
                                    {"currency", "USD"},
                                    {"value", 42.99}
                                }}
                            };

                res.set_content(j2.dump(), "application/json"); });

    svr.listen("localhost", 8000);
}