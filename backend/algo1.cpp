#include <bits/stdc++.h>

using namespace std;
#define ll long long

struct DemandData {
    string date;
    ll category;
};

tm stringToDate(const string &dateStr) {
    tm date = {};
    stringstream ss(dateStr);
    string temp;
    
    getline(ss, temp, '-');
    date.tm_year = stoi(temp) - 1900; 
    getline(ss, temp, '-');
    date.tm_mon = stoi(temp) - 1;  
    getline(ss, temp, '-');
    date.tm_mday = stoi(temp);  
    
    return date;
}

int dateDiffInDays(const tm &startDate, const tm &endDate) {
    time_t startTime = mktime(const_cast<tm*>(&startDate));
    time_t endTime = mktime(const_cast<tm*>(&endDate));
    return difftime(endTime, startTime) / (60 * 60 * 24);
}

vector<DemandData> readData(const string &filename) {
    vector<DemandData> data;
    ifstream file(filename);
    string line;
    
    while (getline(file, line)) {
        stringstream ss(line);
        string date;
        int category;
        
        getline(ss, date, ',');
        ss >> category;
        
        data.push_back({date, category});
    }
    
    return data;
}

vector<int> mva(vector<DemandData> &data, int windowSize, const vector<int> &categories) {
    vector<int> movingAverages(categories.size(), 0);
    unordered_map<int, vector<int>> categoryValues;

    for (size_t i = 0; i < data.size(); ++i) {
        if (find(categories.begin(), categories.end(), data[i].category) != categories.end()) {
            categoryValues[data[i].category].push_back(i);
        }
    }

    for (size_t i = 0; i < categories.size(); ++i) {
        int category = categories[i];
        const auto &indices = categoryValues[category];

        if (indices.size() >= windowSize) {
            for (size_t j = indices.size() - windowSize; j < indices.size(); ++j) {
                movingAverages[i] += 1;
            }
            movingAverages[i] /= windowSize;
        }
    }

    return movingAverages;
}

int main() {
    string filename = "dataset.txt";  
    vector<DemandData> data = readData(filename);

    vector<int> categories = {1, 2, 3, 4, 5};  // Selected categories
    int windowSize = 7;  

    vector<int> predictedPrices = mva(data, windowSize, categories);

    cout << "Expected Price (Moving Average) for selected categories:" << endl;
    for (size_t i = 0; i < categories.size(); ++i) {
        cout << "Category " << categories[i] << ": " << predictedPrices[i] << endl;
    }

    return 0;
}
