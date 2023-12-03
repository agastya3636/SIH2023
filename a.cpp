#include <bits/stdc++.h>
using namespace std;

bool palindrome(int n)
{
    int temp = n, rev = 0;
    while (temp)
    {
        rev = rev * 10 + temp % 10;
        temp /= 10;
    }
    return rev == n;
}

int main()
{
    int n;
    cout << "Enter a length of array: ";
    cin >> n;
    vector<int> v;
    cout << "Enter the elements of array: ";
    for (int i = 0; i < n; i++)
    {
        int x;
        cin >> x;
        v.push_back(x);
    }
    int k;
    cout << "Enter the value of k: ";
    cin >> k;
    vector<int> ans=fourSum(v,k);
    for(int i=0;i<ans.size();i++)
    {
        cout<<ans[i]<<" ";
    }
    return 0;

}