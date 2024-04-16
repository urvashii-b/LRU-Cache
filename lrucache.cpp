#include<bits/stdc++.h>
using namespace std;

class LRUCache{
public:
    class node{
    public:
        int key;
        int val;
        node* prev;
        node* next;
        node(int _key, int _val){
            _key = key;
            _val = val;
        }
    };

    node* head = new node(-1,-1);
    node* tail = new node(-1,-1);

    int cap;
    unordered_map<int, node*>m;

    LRUCache(int capacity){
        cap = capacity;
        head->next = tail;
        tail->prev = head;
    }

    void add(node* addnode){
        node* temp = head->next;
        addnode->next = temp;
        addnode->prev = head;
        head->next = addnode;
        temp->prev = addnode;
    }

    void del(node* delnode){
        node* delprev = delnode->prev;
        node* delnext = delnode->next;
        delprev->next = delnext;
        delnext->prev = delprev;
    }

    int get(int key_){
        if(m.find(key_)!=m.end()){
            /*
            if it exists:
             get the address in resnode and value in res, 
             delete from hashmap then from DLL,
             insert into DLL and hashmap,
             point to head->next now (most recently used)*/ 
            node* resnode = m[key_];
            int res = resnode->val;
            m.erase(key_);
            del(resnode);
            add(resnode);
            m[key_] = head->next;
            return res;
        }
        return -1;
    }

    void put(int key_, int val){
        if(m.find(key_)!=m.end()){
            node* exists = m[key_];
            m.erase(key_);
            del(exists); 
        }
        if(m.size()==cap){
            m.erase(tail->prev->key);
            del(tail->prev);
        }
        add(new node(key_,val));
        m[key_] = head->next;
    }
};

int main(){
    return 0;
}