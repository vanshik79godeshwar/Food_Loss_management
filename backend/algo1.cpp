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

vector<int> mva(vector<DemandData> &data, int windowSize) {
    vector<int> movingAverages;
    
    for (size_t i = windowSize - 1; i < data.size(); ++i) {
        int sum = 0;
        for (int j = i - windowSize + 1; j <= i; ++j) {
            if (data[j].category == data[i].category) {
                sum++;
            }
        }
        movingAverages.push_back(sum);
    }
    
    return movingAverages;
}

int main() {
    string filename = "dataset.txt";  
    vector<DemandData> data = readData(filename);

    int windowSize = 7;  
    vector<int> predictedDemand = mva(data, windowSize);

    cout << "Predicted Demand (Moving Average) for the given window size:" << endl;
    for (size_t i = 0; i < predictedDemand.size(); ++i) {
        cout << "For date " << data[i + windowSize - 1].date << ": " << predictedDemand[i] << " units" << endl;
    }

    return 0;
}
