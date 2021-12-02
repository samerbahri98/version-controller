#include <iostream>
#include <string>
#include <sstream>
#include <fstream>
#include <typeinfo>
#include <filesystem>
#include <functional>

std::string authorized_keys = "/var/git/.ssh/authorized_keys";
std::string authorized_keys_temp = "./authorized_keys.temp";

void swap_files(std::string from, std::string to, std::function<bool(std::string)> callback)
{
    std::fstream fileFrom, fileTo;

    std::string line;

    fileFrom.open(from, std::ios::in);
    fileTo.open(to, std::ios::out);
    int lineNumber = 0;
    while (getline(fileFrom, line))
    {

        if (callback(line))
        {
            if (lineNumber != 0)
                fileTo << std::endl
                       << line;
            else
                fileTo << line;
            lineNumber++;
        }
    }

    fileFrom.close();
    fileTo.close();
}

void revoke(std::string key)
{

    swap_files(authorized_keys, authorized_keys_temp, [key](std::string line) -> bool
               { return (bool)(key != line); });

    swap_files(authorized_keys_temp, authorized_keys, [](std::string line) -> bool
               { return true; });
    std::fstream f;

    std::filesystem::remove(authorized_keys_temp);
}

void set(std::string key)
{
    std::fstream file;

    file.open(authorized_keys, std::ios::app);

    file << key << std::endl;
    file.close();
}

int main(int argc, char *argv[])
{
    std::string command = argv[1];
    if (command == "revoke")
    {
        std::string key = "no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty " + std::string(argv[2]) + " " + std::string(argv[3]) + " " + std::string(argv[4]);
        revoke(key);
    }
    else if (command == "set")
    {
        std::string key = "no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty " + std::string(argv[2]) + " " + std::string(argv[3]) + " " + std::string(argv[4]);
        set(key);
    }
    std::fstream f;

    f.open(authorized_keys, std::ios::app);
    f << std::endl;
    f.close();

    return 0;
}