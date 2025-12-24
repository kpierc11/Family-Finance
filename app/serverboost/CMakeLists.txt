cmake_minimum_required(VERSION 3.11)
project(httplib_server LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

include(FetchContent)

# ---- cpp-httplib ----
FetchContent_Declare(
  httplib
  SYSTEM
  GIT_REPOSITORY https://github.com/yhirose/cpp-httplib
  GIT_TAG v0.28.0
  GIT_SHALLOW TRUE
)
FetchContent_MakeAvailable(httplib)

# ---- nlohmann/json ----
FetchContent_Declare(
  nlohmann_json
  GIT_REPOSITORY https://github.com/nlohmann/json
  GIT_TAG v3.12.0   # or latest stable release
  GIT_SHALLOW TRUE
)
FetchContent_MakeAvailable(nlohmann_json)

# ---- Build your executable ----
add_executable(httplib_server
  src/main.cpp
)

# Link libraries
target_link_libraries(httplib_server PRIVATE 
    httplib::httplib
    nlohmann_json::nlohmann_json
)
